import React, { Component } from 'react';
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";
import Subject from "./components/Subject";
import Control from "./components/Control";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode: 'welcome',
      selected_content_id:2,
      subject:{title:'WEB', sub:'World wide Web!'},
      welcome:{title:'Welcome', desc:'Hello, React!'},
      contents:[
        {id:1, title:'HTML', desc:'HTML is for information'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'Javascript', desc:'Javascript is for interaction'}
      ]
    }
  }
  getReadContent () {
    for(var i =0; i < this.state.contents.length; i++) {
      var data = this.state.contents[i];
      if (data.id === this.state.selected_content_id) {
        return data;
        // break;
      }
    }

    
  }

  getContent() {
    var _title;
    var _desc;
    var _article;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if (this.state.mode === 'read') {
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    } else if (this.state.mode === 'create') {
      _article = <CreateContent onSubmit={function(_title, _desc) {
        console.log(_title);
        console.log(_desc);
        // add content to this.state.contents
        this.max_content_id = this.max_content_id + 1;

        // push는 원본 데이터를 변경하기 때문에 추후 개선 작업이 까다롭다.
        // concat은 원본 데이터를 건들지 않고 새로운 배열을 생성한다.
        var _contents = Array.from(this.state.contents);
        _contents.push({id:this.max_content_id, title:_title, desc:_desc});

        // var _contents = this.state.contents.concat(
        //   {id:this.max_content_id, title:_title, desc:_desc}
        //   );

        // var newContents = Array.from(this.state.contents);
        // newContents.push({id:this.max_content_id, title:_title, desc:_desc});
        this.setState({
          contents: _contents,
          mode: "read",
          selected_content_id:this.max_content_id
        });
      }.bind(this)}></CreateContent>
    } else if (this.state.mode === 'update') {
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} 
        onSubmit={function(_id, _title, _desc) {
          var _contents = Array.from(this.state.contents);
          // _contents.forEach(function(element, i ) {
          //   if(element[i].id === _id) {
          //     _contents[i] = {id: _id, titls: _title, desc: _desc};
          //   }
          // });

          var i = 0;
          while (i < _contents.length) {
            if (_contents[i].id === _id) {
              _contents[i] = {id:_id, title:_title, desc:_desc};
              break;
            }
            i = i + 1;
          }
          
          this.setState({
            contents: _contents,
            mode: "read"
          });
        }.bind(this)}></UpdateContent>
    }

    return _article;
  }

  render() {
    return (
      <div className="App">
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}
          onChangePage={function () {
            this.setState({mode: 'welcome'});
          }.bind(this)}
          >
        </Subject>
        <TOC 
          onChangePage={function (id) {
            this.setState({
              mode: 'read',
              selected_content_id: Number(id)
            });
          }.bind(this)}
          data={this.state.contents}
        ></TOC>
        <Control onChangeMode={function(_mode){
          if (_mode === "delete") {
            if(window.confirm("really?")) {
              var _contents = Array.from(this.state.contents);
              var i = 0;
              while(i < _contents.length) {
                if (_contents[i].id === this.state.selected_content_id) {
                  _contents.splice(i, 1);
                  break;
                }
                i = i + 1;
              }
              this.setState({
                mode:"welcome",
                contents: _contents
              });
              alert("delete!");
            }
          } else {
            this.setState({
              mode:_mode
            });
          }
        }.bind(this)}></Control>
        {this.getContent()}
      </div>
    );
  }
}

export default App;
