import React, { Component } from "react";
import "./table.css";
import lessons from "./lessons";

class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lessons,
      sortConfig: { key: "name", direction: "ascending" },
      searchVal: "",
    };
  }
  setSortedField = () => {
    let { sortConfig, lessons } = this.state;
    if (sortConfig !== null) {
      let sortedLessons = lessons.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
      this.setState({ lessons: sortedLessons });
    }
  };

  requestSort = (key) => {
    let direction = "ascending";
    let { sortConfig } = this.state;
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    this.setState({ sortConfig: { key, direction } });
    this.setSortedField();
  };

  getClassNamesFor = (name) => {
    let { sortConfig } = this.state;
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  renderTableHeader() {
    let header = Object.keys(this.state.lessons[0]);
    return header.map((key, index) => {
      return (
        <th key={index}>
          <button type="button" onClick={() => this.requestSort(key)} className={this.getClassNamesFor(key)}>
            {key.toUpperCase()}
          </button>
        </th>
      );
    });
  }
  addToCart(lesson) {
    const loggedIn = sessionStorage.getItem("isLoggedIn");
    if (loggedIn) {
      const cartItems = this.props.cartItems;
      const updatedCart = [...cartItems, lesson];
      console.log(updatedCart);
      this.props.cartItemChange(updatedCart);
    } else {
      this.props.openModal();
    }
  }
  removeFromCart(lesson) {
    const cartItems = this.props.cartItems;
    const updatedCart = cartItems.filter((value, index) => {
      return value.id !== lesson.id;
    });
    console.log(updatedCart);
    this.props.cartItemChange(updatedCart);
  }
  renderTableData() {
    return this.state.lessons.map((lesson, index) => {
      const { name, description, author, publishDate, duration, id, image } = lesson;
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{description}</td>
          <td>{author}</td>
          <td>{publishDate}</td>
          <td>{duration}</td>
          <td>
            <img src={image} height="100" width="100" />
          </td>
          <td>
            {!this.props.cartItems.some((f) => f.id === lesson.id) && (
              <button onClick={() => this.addToCart(lesson)}> add</button>
            )}
            {this.props.cartItems.some((f) => f.id === lesson.id) && (
              <button onClick={() => this.removeFromCart(lesson)}> remove</button>
            )}
          </td>
        </tr>
      );
    });
  }

  setSearchValue(val) {
    this.setState({ searchVal: val });
    const filtered = lessons.filter((f) => f.name.toLowerCase().includes(val.toLowerCase()));
    if (filtered.length) {
      this.setState({ lessons: filtered });
    } else if (val == "") {
      this.setState({ lessons });
    }
  }

  render() {
    return (
      <div>
        <h1 id="title">Table</h1>
        <input type="text" onChange={(e) => this.setSearchValue(e.target.value)} />
        <table id="lessons">
          <tbody>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
