import React, { Component } from 'react';

class TOC extends Component {
    shouldComponentUpdate(newProps, newState) {
        if (this.props.data === newProps.data) {
            return false;
        }

        return true;
    }
    render() {
        var lists = [];
        var data = this.props.data;
        var idx;
        for (idx = 0; idx < data.length; idx++) {
            lists.push(
            <li key={data[idx].id}>
                <a 
                href={"/content/" + data[idx].id}
                data-id={data[idx].id}
                onClick={function (e) {
                    e.preventDefault();
                    this.props.onChangePage(e.target.dataset.id);
                }.bind(this)}
                >{data[idx].title}</a>
            </li>);
        }

      return (
        <nav>
            <ul>
                {lists}
            </ul>
        </nav>
      )
    }
  }

  export default TOC;