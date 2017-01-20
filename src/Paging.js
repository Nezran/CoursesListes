/**
 * Created by micka on 28/12/2016.
 */

var React = require('react');
import RaisedButton from 'material-ui/RaisedButton';
import {green800, green100} from 'material-ui/styles/colors';
import ArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';

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

        const styles = {
            button: {
                margin: 1,
                width: "auto",
                minWidth: "auto",
                color: green800,
                backgroundColor: green100,
            },
        };

            var page = 0;
            // console.log(typeof(page));
            page = page + Number(this.props.page);
            // console.log(typeof(page));

            var limitpage = 0;
            if(nbrPages < 3){
                limitpage = nbrPages;
            }else{
                limitpage = page + 3;

            }

            if(page <= 3){
                page = 1;
            }else{
                page = page - 3;
            }
            // console.log(typeof(page), typeof(limitpage));

            // console.log("limit"+page);


            var pageprev = 0;
            // pageprev = Number(page) - 1;
            if((Number(this.props.page) - 1) < 1){
                pageprev = 1;
            }else{
                pageprev = Number(this.props.page) - 1;
            }
            console.log("prev",pageprev);


            var pagenext = 0;
            if((Number(this.props.page) + 1) >= nbrPages){
                pagenext = Number(nbrPages);
            }else{
                pagenext = Number(this.props.page) + 1;
            }
            console.log("next",pagenext);


            // (Number(this.props.page) - 1) => 1 ? 2 : 1
            pagination.push( <RaisedButton
                icon={<ArrowLeft />}
                style={styles.button}
                fullWidth="false"
                onClick={this.handleClick.bind(this, pageprev )}
                disabled={limitpage == 1 ? true : false}

            />);
            for (var i = page; i <= limitpage; i++) {
                pagination.push(
                    <RaisedButton
                        style={styles.button}
                        primary={true}
                        fullWidth="false"
                        label={i}
                        onClick={this.handleClick.bind(this, i)}
                        disabled={this.props.page != i ? false : true}
                    />);
                // pagination.push(<span className={this.props.page != i ? 'pagination' : 'paginationNoClick'} onClick={this.handleClick.bind(this,  i)}>{i}</span>);
            }
            // pagination.push(
            //     <RaisedButton
            //         style={styles.button}
            //         fullWidth="false"
            //         label={nbrPages}
            //         onClick={this.handleClick.bind(this, nbrPages)}
            //         disabled={this.props.page != i ? false : true}
            //     />);
            pagination.push( <RaisedButton
                icon={<ArrowRight />}
                style={styles.button}
                fullWidth="false"
                onClick={this.handleClick.bind(this, pagenext)}
                disabled={(pagenext == nbrPages) && (page = nbrPages) ? true : false}

            />);
        return (
          <div>
              <div>
                  {/*{console.log(nbrPages)}*/}
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