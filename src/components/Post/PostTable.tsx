import * as React from "react";
import { Table, Tag, Radio, Button, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { postAPI } from "../../resources/api/post";
import { Link } from "react-router-dom";
import { Box } from "@chakra-ui/core";
interface IProps {}
interface IState {
  top: any;
  bottom: any;
  data1: any[];
}

class PostTable extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      top: "topRight",
      bottom: "bottomRight",
      data1: [],
    };
  }

  componentDidMount() {
    postAPI.getPosts(0, 20, []).then((posts) => {
      var data = [];
      posts.map((post, index) => {
        var { id, subject, createdBy, tags } = post;
        var key = id.toString();
        var newPost = { ...newPost, id, subject, createdBy, tags, key };
        return data.push(newPost);
      });

      this.setState({
        data1: data,
      });
    });
  }

  handleDelete(id) {
    postAPI.deletePost(id).then();
    return this.componentDidMount();
  }

  columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "subject",
      key: "subject",
      render: (text) => <a>{text}</a>,
    },

    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (tags) => (
        <span>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "red" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: "Author",
      dataIndex: "createdBy",
      key: "createdBy",
    },
    {
      key: "id",
      render: (text, record) => (
        <Link to={`/admin/update/${record.id}`}>
          <Tooltip title="Update">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              size="large"
            />
          </Tooltip>
        </Link>
      ),
    },
    {
      key: "id",
      render: (text, record) => (
        <Tooltip title="Delete">
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            size="large"
            onClick={() => this.handleDelete(record.id)}
          />
        </Tooltip>
      ),
    },
  ];

  render() {
    return (
      <Box w="100%">
        <Radio.Group
          style={{ marginBottom: 10 }}
          value={this.state.bottom}
          onChange={(e) => {
            this.setState({ bottom: e.target.value });
          }}
        />
        <Table
          columns={this.columns}
          pagination={{ position: [this.state.bottom] }}
          dataSource={this.state.data1}
        />
      </Box>
    );
  }
}

export default PostTable;
