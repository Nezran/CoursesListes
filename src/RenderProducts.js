/**
 * Created by Mickael.LACOMBE on 17.01.2017.
 */

var React = require('react');
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import ActionThumbDown from 'material-ui/svg-icons/action/thumb-down';
import AddAPhoto from 'material-ui/svg-icons/image/add-a-photo';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ActionThumbsUpDown from 'material-ui/svg-icons/action/thumbs-up-down';
import {GridList, GridTile} from 'material-ui/GridList';
import ActionHome from 'material-ui/svg-icons/action/home';

import {
    green900, cyan700,
    brown500, green500,red500,
    grey100, grey300, grey400, grey500,
    white, darkBlack, fullBlack, amber500
} from 'material-ui/styles/colors';
var RenderProducts = React.createClass({
    getIcon: function(value) {
        const iconStyles = {
            marginRight: 24,
        };
        switch (value) {
            case "high":
                return (
                    <ActionThumbDown color={red500} style={iconStyles}/>
                );
                break;
            case "low":
                return (
                    <ActionThumbUp color={green900} style={iconStyles}/>
                );
                break;
            case "moderate":
                return (
                    <ActionThumbsUpDown color={amber500} style={iconStyles}/>
                );
                break;
        }
    },
    onClickProduct: function(product){
        // console.log(product);
        this.props.onClick(product);
    },
    render: function(){    
            // if(!this.props.products.nutriments.fat ){
            //     this.props.products.nutriments.fat = 0;
            //     this.props.products.nutriments.fat_unit = "g";
            //     this.props.products.nutrient_levels.fat = "low";
            // }

        const styles = {
            minHeight: 670,
            backgroundColor: green500,
            color: white,
        };

            if(!this.props.products.nutriments['saturated-fat']){
                this.props.products.nutriments['saturated-fat'] = 0;
                this.props.products.nutriments['saturated-fat_unit'] = "g";
                this.props.products.nutrient_levels['saturated-fat'] = "low";
                // console.log(this.props.products);
                // console.log("dsadasdas :", this.props.products.nutriments['saturated-fat_unit']);
            }

            return (
                <div className="col span_1_of_5 products">

                    <Card
                    style={styles}
                    >
                        <CardTitle title={this.props.products.product_name_fr ? this.props.products.product_name_fr : 'Produit sans nom'} subtitle={this.props.products.quantity} titleColor="white" subtitleColor="white"/>
                        <CardText
                            color="white"
                        >
                            {
                                this.props.products.image_front_small_url ?
                                <img src={this.props.products.image_front_small_url}  />
                                :
                                <AddAPhoto color={green900} />
                           }


                            <p>Par {this.props.products.nutrition_data_per}</p>
                            {  this.props.products.nutriments.fat && this.props.products.nutrient_levels.fat ?
                                <p>
                                    {this.getIcon(this.props.products.nutrient_levels.fat)}
                                    Matières
                                    grasses {this.props.products.nutriments.fat} {this.props.products.nutriments.fat_unit}
                                </p>
                                :
                                ""
                            }
                            {
                                this.props.products.nutriments['saturated-fat'] && this.props.products.nutrient_levels['saturated-fat'] ?
                                    <p>
                                        {this.getIcon(this.props.products.nutrient_levels['saturated-fat'])}

                                        Acides gras saturés {this.props.products.nutriments['saturated-fat'] ? this.props.products.nutriments['saturated-fat'] : ""} {this.props.products.nutriments['saturated-fat_unit']}
                                    </p>
                                    :
                                    ""
                            }

                            { this.props.products.nutrient_levels.sugars && this.props.products.nutrient_levels.sugars ?

                                <p>
                                    {this.getIcon(this.props.products.nutrient_levels.sugars ? this.props.products.nutrient_levels.sugars : "low")}
                                    Sucre {this.props.products.nutriments.sugars ? this.props.products.nutriments.sugars : "0" } {this.props.products.nutriments.sugars_unit ? this.props.products.nutriments.sugars_unit : "g"}
                                </p>
                                : ""
                            }

                            {
                                this.props.products.nutrient_levels.salt ?
                                    <p>
                                        {this.getIcon(this.props.products.nutrient_levels.salt ? this.props.products.nutrient_levels.salt : "low")}

                                        Sel {this.props.products.nutriments.salt ? this.props.products.nutriments.salt : "0"} {this.props.products.nutriments.salt_unit ? this.props.products.nutriments.salt_unit : "g"}
                                    </p>
                                    :
                                    ""
                            }
                        </CardText>
                        <CardActions>
                            {/*<FlatButton label="Action1" />*/}
                            {/*<FlatButton label="Action2" />*/}
                            <RaisedButton label="Descriptif complet" primary={false} href={this.props.products.url} />
                            <RaisedButton label="Ajouter" primary={false} onClick={this.onClickProduct.bind(this,this.props.products)} />
                        </CardActions>
                    </Card>
                </div>
            )
        
    }
});

module.exports = RenderProducts;
