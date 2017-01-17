/**
 * Created by micka on 28/12/2016.
 */

var React = require('react');

var Paging = React.createClass({
    // getDefaultProps: function () {
    //     return { page: 1 };
    // },
    // propTypes:{
    //     page : React.PropTypes.number,
    // },
    generatePagination: function(){


        // for(var i = 0; i <= nbrPages; i++){
        //      return <div><a>{i}</a></div>;
        // }
        //
    },
    handleClick: function(e){
        // this.props.onClick(e);
        console.log("s "+e);
        this.props.onSubmit(e);
    },
    render: function(){

        var nbrPages = Math.ceil(this.props.total / this.props.productsPerPage );

        // var nbrPages = 9;

        var pagination = [];

        if(nbrPages > 10){
            var page = 0;
            // console.log(typeof(page));
            page = page + Number(this.props.page);
            // console.log(typeof(page));
            var limitpage = 0;
            limitpage = page + 5;
            if(page <= 5){
                page = 1;
            }else{
              page = page - 5;
            }
            console.log(typeof(page), typeof(limitpage));

            console.log("limit"+limitpage);
            for (var i = page; i <= limitpage; i++) {
                pagination.push(<span className={this.props.page != i ? 'pagination' : 'paginationNoClick'} onClick={this.handleClick.bind(this,  i)}>{i}</span>);
            }
            pagination.push(<span className='pagination'>...</span>);
            pagination.push(<span className='pagination' onClick={this.handleClick.bind(this, nbrPages)}>{nbrPages}</span>);

        }else{

            for (var i = 1; i <= nbrPages; i++) {
                pagination.push(<span className={this.props.page != i ? 'pagination' : 'paginationNoClick'}onClick={this.handleClick.bind(this, i)}>{i}</span>);
            }
        }

        return (
          <div>
              <div>
                  {console.log(nbrPages)}
                  <br/>
                  {pagination}
                  <p>Nombre de produits : {this.props.total}</p>
                  <p>Nombre de produits par page : {this.props.productsPerPage}</p>
              </div>
          </div>
        );

    }
});

module.exports = Paging;