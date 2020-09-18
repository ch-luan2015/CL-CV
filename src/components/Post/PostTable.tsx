import * as React from "react";

import { Cell, Column, Table, TableLoadingOption } from "@blueprintjs/table";
import { postAPI } from "../../resources/api/post";
import { Button, Icon } from "@blueprintjs/core";

// const bigSpaceRocks = require("./post.json") as IBigSpaceRock[];
// console.log("bigSpaceRocks", bigSpaceRocks);

//Data
interface IBigSpaceRock {
  [key: string]: number | string;
}

interface ITableLoading {
  cellsLoading?: boolean;
  bigSpaceRocks: IBigSpaceRock[];
}

interface IProps {}
//Component
class PostTable extends React.Component<IProps, ITableLoading> {
  constructor(props) {
    super(props);
    this.state = {
      cellsLoading: true,
      bigSpaceRocks: [
        {
          id: "",
          subject: "",
          createdBy: "",
        },
      ],
    };
  }

  componentDidMount() {
    postAPI.getPosts(0, 10, []).then((posts) => {
      var newBigSpaceRocks: IBigSpaceRock[] = [];

      posts.map((post) => {
        var { id, subject, createdBy } = post;
        var newPost = { ...newPost, id, subject, createdBy };
        return newBigSpaceRocks.push(newPost);
      });

      this.setState({
        bigSpaceRocks: newBigSpaceRocks,
      });
    });

    this.setState({
      cellsLoading: false,
    });
  }

  //Render
  render() {
    const loadingOptions: TableLoadingOption[] = [];
    if (this.state.cellsLoading) {
      loadingOptions.push(TableLoadingOption.CELLS);
    }
    return (
      <Table
        numRows={this.state.bigSpaceRocks.length}
        loadingOptions={loadingOptions}
      >
        {this.renderColumns()}
      </Table>
    );
  }

  renderColumns() {
    const columns: JSX.Element[] = [];

    Object.keys(this.state.bigSpaceRocks[0]).forEach((columnName, index) => {
      columns.push(
        <Column
          key={index}
          name={this.formatColumnName(columnName)}
          cellRenderer={this.renderCell}
        />
        // <Column>
        //   <Button rightIcon="arrow-right" intent="success" text="Next step" />
        // </Column>
      );
    });

    return columns;
  }

  renderCell = (rowIndex: number, columnIndex: number) => {
    const bigSpaceRock = this.state.bigSpaceRocks[rowIndex];
    return <Cell>{bigSpaceRock[Object.keys(bigSpaceRock)[columnIndex]]}</Cell>;
  };

  formatColumnName = (columnName: string) => {
    return columnName
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (firstCharacter) => firstCharacter.toUpperCase());
  };
}

export default PostTable;
