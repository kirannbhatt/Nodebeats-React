import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectLocation } from 'containers/App/selectors';

function AdminRoutes({ location }) {
    return(
        <Switch location={location}>
            {/* <Route exact path="/dashboard" component={AdminDashboard} /> */}
        </Switch>
    );
}

const mapStateToProps = createStructuredSelector({
    location: makeSelectLocation(),
});
  
export default connect(mapStateToProps)(AdminRoutes);