/**
 * Created by micka on 28/12/2016.
 */

var React = require('react');

var Paging = React.createClass({
    generatePagination: function(){


        // for(var i = 0; i <= nbrPages; i++){
        //      return <div><a>{i}</a></div>;
        // }
        //
    },
    handleClick: function(e){
        this.props.onClick(e);
        this.props.onSubmit();
    },
    render: function(){

        var nbrPages = Math.ceil(this.props.total / this.props.productsPage );
        // var nbrPages = 9;
        var pagination = [];

        if(nbrPages > 10){


            for (var i = 1; i <= 10; i++) {
                pagination.push(<span className='pagination' key={i} onClick={this.handleClick.bind(this,  i)}>{i}</span>);
            }
            pagination.push(<span className='pagination' key={0}>...</span>);
            pagination.push(<span className='pagination' key={nbrPages} onClick={this.handleClick.bind(this, nbrPages)}>{nbrPages}</span>);


        }else{

            for (var i = 1; i <= nbrPages; i++) {
                pagination.push(<span className='pagination' key={i}><a href="#"  onClick={this.handleClick.bind(this, i)}>{i}</a></span>);
            }
        }

        return (
          <div>
              <div>
                  {console.log(nbrPages)}

                  {pagination}
              </div>
          </div>
        );

    }
});

module.exports = Paging;