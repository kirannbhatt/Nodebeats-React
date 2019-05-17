import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';

import { fetchNewsEditor,
  newsEditorRequest,
  newsEditorPost,
  newsCategory,
  newsImageDeleteRequest,
  newsTagsGetRequest
} from './actions';
import { selectNewsEditor,
  selectSuccessResponse,
  selectErrorResponse,
  selectRequestingResponse,
  selectNewsCategoryResponse,
  selectTagsResponse
} from './selectors';

import { makeSelectDialog } from 'containers/App/selectors';
import { showDialog } from 'containers/App/actions';
import TextFieldGroup from 'utils/textFieldGroup';
import Toaster from 'components/Toaster';
import loader from 'assets/img/loader.svg';
import BackButton from "components/common/BackButton";
import SearchableDropDown from "components/common/Forms/Dropdown";
import Dropzone from 'react-dropzone';
import TemplateModal from './../EmailTemplate/TemplateModal';
import DatePicker from 'react-datepicker';
import {Editor} from '@tinymce/tinymce-react';

import { TextArea, Dropdown, Image } from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';
import { IMAGE_URL } from 'containers/App/constants'

const summaryMaxLength = 320;
const mapDispatchToProps = dispatch => ({
  showDialog          : dialog => dispatch(showDialog(dialog)),
  hideDialog          : () => dispatch(showDialog(null)),
  fetchNewsEditor     : id => dispatch(fetchNewsEditor(id)),
  newsEditorRequest   : (newsEditor, documents) => dispatch(newsEditorRequest(newsEditor, documents)),
  newsEditorPost      : (formData, documents) => dispatch(newsEditorPost(formData, documents)),
  loadNewsCategory    : () => dispatch(newsCategory()),
  deleteFile          : (_id, file_path) => dispatch(newsImageDeleteRequest(_id, file_path)),
  loadTags            : () => dispatch(newsTagsGetRequest())
});

const mapStateToProps = createStructuredSelector({
  news            : selectNewsEditor(),
  successResponse : selectSuccessResponse(),
  errorResponse   : selectErrorResponse(),
  requestResponse : selectRequestingResponse(),
  newsCategory    : selectNewsCategoryResponse(),
  dialog          : makeSelectDialog(),
  tagsResponse    : selectTagsResponse()

});

class NewsEditor extends React.Component {
  state = {
    newsCategory:[],
    newsEditor: {
      category_id  : [],
      title       : '',
      summary     : '',
      author      : '',
      publish_date: new Date(),
      description : '',
      tag         : [],
      active      : false,
      nada_special: false,
      featured    : false,
      read_time   : null,
      slug_URL    : '',
    },
    attachments   : [],
    accepted      : [],
    errors        : {},
    rejected      : [],
    showDialog    : false,
    tagOptions    : [],

  };

  componentDidMount() {
    this.props.loadNewsCategory();
    this.props.loadTags();

    let id = this.props.match.params.id ? this.props.match.params.id : null
    if(id){
      this.props.fetchNewsEditor(id);
    }

    window.addEventListener("beforeunload", (e) => {  
      e.preventDefault();
      return e.returnValue = 'Are you sure you want to close?';
    });
  }

  componentWillReceiveProps(nextProps, prevProps) {
    if(typeof nextProps.newsCategory !== 'string') {
      if (nextProps.newsCategory !== this.props.newsCategory) {
        const categories = nextProps.newsCategory.get('dataList').toJS();
        let catArr = [];
        categories.map((item,index) => {
          catArr.push({key : item.name, value: item._id, text: item.name})
        });
        this.setState({
          newsCategory : catArr
        })
      }
    } else {
      this.setState(state => ({
        message: nextProps.newsCategory
      }));
    }

    if((nextProps.tagsResponse !== this.props.tagsResponse) && nextProps.tagsResponse.size > 0){
      let tags = nextProps.tagsResponse.toJS();
      let tagsArr = [];
      tags.map((item, index)=>{
        tagsArr.push({key : item, value: item, text: item})
      })
      this.setState({
        tagOptions : tagsArr
      })
    }

    if (nextProps.news.size && nextProps.news !== this.props.news) {
      nextProps.news
        .entrySeq()
        .map(([key, value]) => {
          if (key === 'image_name') {
            this.setState(state => ({
              attachments: [
                ...state.attachments,
                { document_name: value, document_path: nextProps.news.get('image_path') }
              ]
            }));
          }
          else if (key === 'image_path') {
            //do nth
          }
          else if (key === 'category_id') {
            this.setState(state => ({
              newsEditor: { ...state.newsEditor, [key]: (typeof (value) === "string") ? [value] : value.toJS() }
            }));
          }
          else {
            this.setState(state => ({
              newsEditor: { ...state.newsEditor, [key]: (key === "tag" && value !=="" ) ? value.toJS() : value }
            }));
          }
        })
        .toArray();
    }

    if (this.props.docDeleted !== nextProps.docDeleted) {
      nextProps.deletedFile
        .entrySeq()
        .map(([key, value]) => {
          const index = this.state.attachments.findIndex(x => x.document_path == value);
          this.setState(state => ({
            ...state,
            attachments: this.state.attachments.filter((_, i) => i !== index)
          }));
        })
        .toArray();
    }
  }
 
  handleChange = (event, semanticEvent) => {
    const fieldName = (semanticEvent && semanticEvent.name) ? semanticEvent.name : event.target.name,
          value     = (semanticEvent && semanticEvent.name) ? semanticEvent.value : event.target.value;
      if(fieldName === 'summary' && value.length > summaryMaxLength){
        return;    
      }
      this.setState(
        {
          newsEditor: {
            ...this.state.newsEditor,
            [fieldName]: value
          }
        },
        () => {
          this.validateField([fieldName]);
        }
      );
  };

  handleEditorChange = (event) => {
    this.setState({
      newsEditor:{
        ...this.state.newsEditor,
        description: event.target.getContent()
      }
    })
  }

  
  handlePublishDateChange = (event, data) => {
    let date = event._d;
    this.setState(
      {
        newsEditor: {
          ...this.state.newsEditor,
          publish_date: this.parseDate(date)
        }
      });
  }

  handleBlur = event => {
    const fieldName = event.target.name;
    this.validateField([fieldName]);
  };

  validateField = validate => {
    const errors = { ...this.state.errors };
    let hasError = false;

    validate.forEach(field => {
    if (this.state.newsEditor[field].length === 0) {
        hasError = true;
        errors[field] = `${field} cannot be empty`;
      } else {
        errors[field] = '';
      }
    });
    this.setState({ errors });
    return !hasError;
  };

  handleSubmit = event => {
    event.preventDefault();
    let fields = ['category_id', 'title', 'summary', 'author', 'tag', 'read_time'];

    if (this.validateField(fields)) {
      let id = this.props.match.params.id ? this.props.match.params.id : null
      if(!id){
        this.props.newsEditorPost(this.state.newsEditor, this.state.accepted);
      }
      else {
        this.props.newsEditorRequest(this.state.newsEditor, this.state.accepted);
      }
    }
  };

  handleTags = (e, { value }) => {
    this.setState({
      newsEditor: { ...this.state.newsEditor, tag: value }
    });
  };

  handleTagAddition = (e, { value }) => {
    this.setState({
      tagOptions: [{ text: value, value }, ...this.state.tagOptions]
    });
  };

  handleActiveChecked = () =>
    this.setState(state => ({
      newsEditor: { ...state.newsEditor, active: !state.newsEditor.active }
  }));

  handleFeaturedChecked = () =>
    this.setState(state => ({
      newsEditor: { ...state.newsEditor, featured: !state.newsEditor.featured }
  }));

  handleReviewChecked = () =>
    this.setState(state => ({
      newsEditor: { ...state.newsEditor, is_review: !state.newsEditor.is_review }
  }));

  handleNadaChecked = () => 
  this.setState(state => ({
    newsEditor: { ...state.newsEditor, nada_special: !state.newsEditor.nada_special}
  }));

  onDrop = (accepted, rejected) => {
    this.setState({
      accepted,
      rejected
    });
  };

  showUploadedFiles() {
    const { attachments } = this.state;
    let uploaded = true;
    return (
      <div>
        <ul className="uploaded">
          {attachments.map((file, idx) => { 
            if(file.document_name) {
              return <div className="card" key={idx}>
                      <li>
                        <Image src={`${IMAGE_URL}${file.document_name}`} />
                        <div className="label label-default">
                          {file.document_name}
                          <i className="icon-trash" onClick={e => this.handleRemove(file, uploaded)} />
                        </div>
                      </li>
                    </div>
            }
             return null; 
            }
          )}
        </ul>
      </div>
    );
  }

  handleUploadedDocumentRemove = (_id, file) => {
    this.props.deleteFile(_id, file.document_path);
  };

  handleDialog = (data) => {
    let dialog = <TemplateModal
      onClose={() => this.props.hideDialog(null)}
      template={data}
    />;
    this.props.showDialog(dialog);
  };

  showDroppedFiles() {
    const { accepted } = this.state;
    let uploaded = false;
    return (
      <div>
        <ul className="dropped">
          {accepted.map((file, idx) => {
            // debugger;
            if(file.name) {
              return <div className="card" key={idx}>
                      <li>
                        <Image src={`${file.preview}`} />
                        <div className="label label-default fluid">
                          {file.name}
                          <i className="icon-trash" onClick={e => this.handleRemove(file,uploaded)} />
                        </div>
                      </li>
                    </div>
            } else {
              return null ;
            }
          }
          )}
        </ul>
      </div>
    );
  }

  handleRemove = (file, uploaded) => {
    const newState = ( uploaded === true ) ? this.state.attachments : this.state.accepted;
    if (newState.indexOf(file) > -1) {
      newState.splice(newState.indexOf(file), 1);
      ( uploaded === true ) ? this.setState({ attachments: newState }) : this.setState({ accepted: newState });
    }
  };

  parseDate = date => {
    const momentDate = moment(date, 'YYYY/MM/DD');
    return momentDate.format('YYYY/MM/DD');
  }

  render() {
    const { newsEditor, errors, newsCategory, tagOptions, attachments, accepted, rejected } = this.state;
    const { news, successResponse, errorResponse, requestResponse } = this.props;
    //console.log('checking for relevant news got or not',news.toJS())
    if (requestResponse) {
      return (
        <div>
          <img src={loader} />
        </div>
      );
    }
    let message;
    if (successResponse && typeof successResponse === 'string') {
      message = <Toaster message={successResponse} timeout={1000} success />;
    }
    if (errorResponse && typeof errorResponse === 'string') {
      message = <Toaster message={errorResponse} timeout={1000} error />;
    }

    return (
      <div className="left container">
        <BackButton
          history={this.props.history}
          location={"/admin/dashboard/news"}
        />
        {message && message}
        <form className="ui form" onSubmit={this.handleSubmit}>
          <h1>News Editor</h1>
          <div className="field">
            <label>News Category</label>
            <Dropdown 
              placeholder='News Categories' fluid multiple search selection 
              options={newsCategory}
              noResultsMessage = "Result not found." 
              onChange = {this.handleChange}
              name='category_id'
              value= {newsEditor.category_id || []}
            />
          </div>

          <TextFieldGroup
            name="title"
            type="text"
            value={newsEditor.title || ''}
            label="Title"
            placeholder="Enter Title*"
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            error={errors.title}
            required
          />
          <TextFieldGroup
            name="slug_URL"
            type="text"
            value={newsEditor.slug_URL || ''}
            label="URL Slug"
            placeholder="Enter URL Slug*"
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            error={errors.slug_URL}
            required
          />
          <div className="field">
            <label htmlFor="description">
              Summary ({newsEditor.summary.length}/320 characters*)
            </label>
            <TextArea
              name="summary"
              type="text"
              value={newsEditor.summary || ''}
              label="Summary"
              placeholder="Enter Summary*"
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              autoHeight
              required
              rows={4}
            />
            {errors.summary &&
              <span style={{'color':'#f10'}}> {errors.summary} </span>
            }
          </div>

          <div className="field">
          <input name="my-file" type="file" id="my-file" style={{display: 'none'}}/>
            <label htmlFor="description">
              Description ({newsEditor.description.split(' ').length - 1} words.)
            </label>
            {/* <TextArea
              name="description"
              type="text"
              value={newsEditor.description || ''}
              label="Description"
              className="form-control"
              placeholder="Enter Description"
              onChange={this.handleChange}
              onBlur={this.handleBlur}              
              autoHeight
              rows={7}
            /> */}
            <Editor 
              name="description"
              label="Description"
              placeholder="Enter Description"
              apiKey="5g5faf78gvk6yfq9bd3bbfjo858kjx1q8o0nbiwtygo2e4er"
              initialValue={newsEditor.description || ''}
              init={{
                plugins: 
                      'advlist autolink lists link image charmap print preview hr anchor pagebreak searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking save table contextmenu template paste textcolor colorpicker textpattern'
                    ,
                advlist_bullet_styles: "circle",
                toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | forecolor backcolor emoticons | preview ",
                file_picker_types: 'file image media',
                
                
                file_browser_callback_types: 'image',
                file_picker_callback: function (callback, value, meta) {
                  if (meta.filetype == 'image') {
                    var input = document.getElementById('my-file');
                    input.click();
                    input.onchange = function () {
                        var file = input.files[0];
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            callback(e.target.result, {
                                alt: file.name
                            });
                        };
                        reader.readAsDataURL(file);
                    };
                  }
                },
                paste_data_images: true,     
              }}
              onChange={this.handleEditorChange}
            />
            {/* <span onClick={() => this.handleDialog(newsEditor.description)} >See preview</span> */}
            {errors.description &&
              <span style={{'color':'#f10'}}> {errors.description} </span>
            }
          </div>

          <TextFieldGroup
            name="read_time"
            type="number"
            value={newsEditor.read_time || '' }
            label="Read Time (in Minutes)*"
            placeholder="Read Time (in Minutes)*"
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            error={errors.read_time}
            required
          />

          <TextFieldGroup
            name="author"
            type="text"
            value={newsEditor.author || ''}
            label="Author"
            placeholder="Enter Author*"
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            error={errors.author}
            required
          />
          
          <div className="field">
            <label htmlFor="publish_date">
              Publish Date
            </label>
            <DatePicker
              fluid
              placeholder="Enter Publish Date*"
              value={this.parseDate(newsEditor.publish_date || new Date())}
              onChange={this.handlePublishDateChange}
              error={errors.publish_date}
              required
            /> 
          </div>
          <SearchableDropDown
            options={tagOptions}
            multiple
            search
            allowAdditions
            onAddItem={this.handleTagAddition}
            onChange={this.handleTags}
            label="Tags"
            value={newsEditor.tag || []}
            required
          />

          <Dropzone onDrop={this.onDrop} className="dropzone" accept=".jpeg, .png, .jpg">
            Drop photo here or<br /> <span className="button link"> Upload</span>{' '}
          </Dropzone>
          {errors.accepted &&
            <p className="help-block negative message">
              {errors.accepted}
            </p>}
          {( accepted.length === 0 && attachments.length !== 0 ) && this.showUploadedFiles()}
          {accepted.length !== 0 && this.showDroppedFiles()}
          <br/>
          <label className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              onChange={this.handleActiveChecked}
              checked={newsEditor.active || false}
            />
            <span className="custom-control-indicator" />
            <span className="custom-control-description">Active</span>
          </label>

          <label className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              onChange={this.handleFeaturedChecked}
              checked={newsEditor.featured || false}
            />
            <span className="custom-control-indicator" />
            <span className="custom-control-description">Featured</span>
          </label>

          <label className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              onChange={this.handleReviewChecked}
              checked={newsEditor.is_review || false}
            />
            <span className="custom-control-indicator" />
            <span className="custom-control-description">Review</span>
          </label>

          <label className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              onChange={this.handleNadaChecked}
              checked={newsEditor.nada_special || false}
            />
            <span className="custom-control-indicator" />
            <span className="custom-control-description">NADA News</span>
          </label>

          <button className="ui secondary button">Save Changes</button>
        </form>
        {this.props.dialog && this.props.dialog}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsEditor);
