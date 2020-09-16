import * as React from "react";

import { Cell, Column, Table, Utils } from "@blueprintjs/table";
import { postAPI } from "../../resources/api/post";

const REORDERABLE_TABLE_DATA = [
  ["A", "Apple", "Ape", "Albania", "Anchorage"],
  ["B", "Banana", "Boa", "Brazil", "Boston"],
  ["C", "Cranberry", "Cougar", "Croatia", "Chicago"],
  ["D", "Dragonfruit", "Deer", "Denmark", "Denver"],
  ["E", "Eggplant", "Elk", "Eritrea", "El Paso"],
].map(([letter, fruit, animal, country, city]) => ({
  letter,
  fruit,
  animal,
  country,
  city,
}));

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

var POST_DATA1 = [];

console.log("POST_DATA1", POST_DATA1);
var POST_DATA2 = POST_DATA1.map(([id, subject, createdBy]) => ({
  id,
  subject,
  createdBy,
}));

console.log("POST_DATA2", POST_DATA2);

export interface ITableState {
  columns?: JSX.Element[];
  data?: any[];
}

class PostTable extends React.Component<ITableState> {
  state: ITableState = {
    data: POST_DATA,
    columns: [],
  };

  componentDidMount() {
    const columns = [
      <Column key="1" name="Id" cellRenderer={this.renderLetterCell} />,
      <Column key="2" name="Subject" cellRenderer={this.renderFruitCell} />,
      <Column key="3" name="Author" cellRenderer={this.renderAnimalCell} />,
      <Column key="4" name="Country" cellRenderer={this.renderCountryCell} />,
      <Column key="5" name="City" cellRenderer={this.renderCityCell} />,
    ];

    postAPI.getPosts(0, 10, []).then((posts) => {
      POST_DATA1.push({ posts });
    });

    this.setState({ columns });
  }

  renderLetterCell = (row: number) => <Cell>{this.state.data[row].Id}</Cell>;
  renderFruitCell = (row: number) => (
    <Cell>{this.state.data[row].Subject}</Cell>
  );
  renderAnimalCell = (row: number) => (
    <Cell>{this.state.data[row].Author}</Cell>
  );
  renderCountryCell = (row: number) => (
    <Cell>{this.state.data[row].Country}</Cell>
  );
  renderCityCell = (row: number) => <Cell>{this.state.data[row].City}</Cell>;

  handleColumnsReordered = (
    oldIndex: number,
    newIndex: number,
    length: number
  ) => {
    if (oldIndex === newIndex) {
      return;
    }
    const nextChildren = Utils.reorderArray(
      this.state.columns,
      oldIndex,
      newIndex,
      length
    );
    this.setState({ columns: nextChildren });
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
      data: Utils.reorderArray(this.state.data, oldIndex, newIndex, length),
    });
  };

  render() {
    return (
      <Table
        enableColumnReordering={true}
        enableColumnResizing={false}
        enableRowReordering={true}
        enableRowResizing={false}
        onColumnsReordered={this.handleColumnsReordered}
        onRowsReordered={this.handleRowsReordered}
        numRows={this.state.data.length}
      >
        {this.state.columns}
      </Table>
    );
  }
}

export default PostTable;
