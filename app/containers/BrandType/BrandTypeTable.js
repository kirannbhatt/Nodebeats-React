import React from "react";

import AutoNCellTable from "components/Table";
import SearchBox from "components/SearchBox";
import Loader from "components/Loader";

const BrandTypeTable = ({
  searchItems,
  headers,
  data,
  actions,
  onDelete,
  pagination,
  onPaginate,
  isRequesting,
  ...props
}) => {
  return (
    <div>
      <SearchBox searchItems={searchItems} />
      <AutoNCellTable
        headers={headers}
        data={data && data}
        actions={actions}
        onDelete={onDelete}
        pagination={pagination}
        onPaginate={onPaginate}
        showModal={props.showModal}
      />
    </div>
  );
};

export default BrandTypeTable;
// export default Loader('isRequesting')(ProductTable);
