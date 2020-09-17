import * as React from "react";
import { Switch } from "@blueprintjs/core";
import { BaseExample, handleBooleanChange } from "@blueprintjs/docs-theme";
import { Cell, Column, Table, TableLoadingOption } from "@blueprintjs/table";

import { postAPI } from "../../resources/api/post";

var POST_DATA = [
  ["A", "Apple", "Ape", "Albania", "Anchorage"],
  ["B", "Banana", "Boa", "Brazil", "Boston"],
  ["C", "Cranberry", "Cougar", "Croatia", "Chicago"],
  ["D", "Dragonfruit", "Deer", "Denmark", "Denver"],
  ["E", "Eggplant", "Elk", "Eritrea", "El Paso"],
].map(([Id, Subject, Author, Country, City]) => ({
  Id,
  Subject,
  Author,
  Country,
  City,
}));

export interface ITableState {
  columns?: JSX.Element[];
  data?: any[];
  cellsLoading?: boolean;
}

export interface ITableProps {
  data: any[];
}

class PostTable extends React.Component<ITableProps, ITableState> {
  constructor(props) {
    super(props);
    this.state = {
      cellsLoading: true,
      data: [],
      columns: [],
    };
  }

  // componentDidMount() {
  //   // postAPI.getPosts(0, 10, []).then((posts) => {
  //   //   // console.table(posts);
  //   //   POST_DATA1 = posts.map((post) => {
  //   //     let { id, subject, createdBy } = post;
  //   //     // var postNew.push(id,subject,createdBy)
  //   //     return { ...POST_DATA1, id, subject, createdBy };
  //   //   });

  //     // var columns = Object.keys(POST_DATA1[0]).map((columnName, index) => (
  //     //   <Column
  //     //     key={index}
  //     //     name={this.formatColumnName(columnName)}
  //     //     cellRenderer={this.renderCell}
  //     //   />
  //     // ));

  //     // console.log("columns", columns);
  //     // console.log(POST_DATA1);

  //     // console.table(POST_DATA1);
  //   // });

  //   // this.setState({ columns });
  //   <></>
  // }

  handleCellsLoading = (cellsLoading) => this.setState({ cellsLoading });

  getCellRenderer(key: string) {
    return (row: number) => <Cell>{this.state.data[row][key]}</Cell>;
  }

  renderIdCell = (row: number) => <Cell>{this.state.data[row].id}</Cell>;

  renderSubjectCell = (row: number) => (
    <Cell>{this.state.data[row].subject}</Cell>
  );
  renderCreatedByCell = (row: number) => (
    <Cell>{this.state.data[row].createdBy}</Cell>
  );

  handleColumnsReordered = (
    oldIndex: number,
    newIndex: number,
    length: number
  ) => {
    if (oldIndex === newIndex) {
      return;
    }
    // const nextChildren = Utils.reorderArray(
    //   this.state.columns,
    //   oldIndex,
    //   newIndex,
    //   length
    // );
    // this.setState({ columns: nextChildren });
  };

  handleRowsReordered = (
    oldIndex: number,
    newIndex: number,
    length: number
  ) => {
    if (oldIndex === newIndex) {
      return;
    }
    this.setState({
      // data: Utils.reorderArray(this.state.data, oldIndex, newIndex, length),
    });
  };

  render() {
    return (
      <Table
        loadingOptions={this.getLoadingOptions()}
        enableColumnReordering={true}
        enableColumnResizing={true}
        enableRowReordering={true}
        enableRowResizing={true}
        onColumnsReordered={this.handleColumnsReordered}
        onRowsReordered={this.handleRowsReordered}
        numRows={this.state.data.length}
      >
        {this.state.columns}
      </Table>
    );
  }

  renderCell = (rowIndex: number, columnIndex: number) => {
    // const bigSpaceRock = POST_DATA1[rowIndex];
    // return <Cell>{bigSpaceRock[Object.keys(bigSpaceRock)[columnIndex]]}</Cell>;
  };

  formatColumnName = (columnName: string) => {
    return columnName
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (firstCharacter) => firstCharacter.toUpperCase());
  };

  getLoadingOptions() {
    const loadingOptions: TableLoadingOption[] = [];
    if (this.state.cellsLoading) {
      loadingOptions.push(TableLoadingOption.CELLS);
    }
    return loadingOptions;
  }
}

export default PostTable;
