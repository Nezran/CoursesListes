/**
 * Created by micka on 28/12/2016.
 */

var React = require('react');
import RaisedButton from 'material-ui/RaisedButton';
import {green800, green100} from 'material-ui/styles/colors';
import ArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import ArrowTo from 'material-ui/svg-icons/navigation/arrow-forward';

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
        // console.log("s "+e);
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
            var start = 0;
            var end = 0;

            if(nbrPages - 7 <= 0){
                end = nbrPages;
                start = 1;
            }else{
                if(page <= 3){
                    start = 1;
                    end = 7;
                }else{
                    if(nbrPages - page < 3){
                        end = nbrPages;
                        start = nbrPages - 6 ;
                    }else{
                        start = page - 3;
                        end = page + 3;
                    }
                }
            }

            // console.log("start",start,"end",end);

            var pageprev = 0;
            if((Number(this.props.page) - 1) < 1){
                pageprev = 1;
            }else{
                pageprev = Number(this.props.page) - 1;
            }
            // console.log("prev",pageprev);


            var pagenext = 0;
            if((Number(this.props.page) + 1) >= nbrPages){
                pagenext = Number(nbrPages);
            }else{
                pagenext = Number(this.props.page) + 1;
            }
            // console.log("next",pagenext);


            // (Number(this.props.page) - 1) => 1 ? 2 : 1

            pagination.push( <RaisedButton
                label={1}
                labelPosition="before"
                icon={<ArrowBack />}
                style={styles.button}
                fullWidth="false"
                onClick={this.handleClick.bind(this, 1 )}
                disabled={this.props.page == 1 ? true : false}

            />);

            pagination.push( <RaisedButton
                icon={<ArrowLeft />}
                style={styles.button}
                fullWidth="false"
                onClick={this.handleClick.bind(this, pageprev )}
                disabled={this.props.page == 1 ? true : false}

            />);

            for (var i = start; i <= end; i++) {
                pagination.push(
                    <RaisedButton
                        style={styles.button}
                        primary={true}
                        fullWidth="false"
                        label={i}
                        onClick={this.handleClick.bind(this, i)}
                        disabled={this.props.page != i ? false : true}
                    />);
                // pagination.push(<span className={this.props.page != i ? npm stzart'pagination' : 'paginationNoClick'} onClick={this.handleClick.bind(this,  i)}>{i}</span>);
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
                disabled={(this.props.page >= nbrPages) || (nbrPages == 0) ? true : false}

            />);
            pagination.push( <RaisedButton
                label={nbrPages}
                labelPosition="after"
                icon={<ArrowTo />}
                style={styles.button}
                fullWidth="false"
                onClick={this.handleClick.bind(this, nbrPages)}
                disabled={(this.props.page == nbrPages) || (nbrPages == 0) ? true : false}

            />);
        return (
          <div>
              <div>
                  {/*{console.log(nbrPages, page, limitpage)}*/}
                  <br/>
                  {pagination}
                  <p>Nombre de produits : {this.props.total}</p>
                  <p>Nombre de produits par page : {this.props.productsPerPage}</p>
                  <p>Nombre de pages: {nbrPages}</p>
              </div>
          </div>
        );

    }
});

module.exports = Paging;