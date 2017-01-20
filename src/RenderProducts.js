/**
 * Created by Mickael.LACOMBE on 17.01.2017.
 */

var React = require('react');

var RenderProducts = React.createClass({
    render: function(){    
            // if(!this.props.products.nutriments.fat ){
            //     this.props.products.nutriments.fat = 0;
            //     this.props.products.nutriments.fat_unit = "g";
            //     this.props.products.nutrient_levels.fat = "low";
            // }

            if(!this.props.products.nutriments['saturated-fat']){
                this.props.products.nutriments['saturated-fat'] = 0;
                this.props.products.nutriments['saturated-fat_unit'] = "g";
                this.props.products.nutrient_levels['saturated-fat'] = "low";
                // console.log(this.props.products);
                // console.log("dsadasdas :", this.props.products.nutriments['saturated-fat_unit']);
            }
            return (
                <div className="col span_1_of_5 products">
                    <span className="l-box">
                    <p>{this.props.products.product_name_fr ? this.props.products.product_name_fr : 'Produit sans nom'}
                        <i> {this.props.products.quantity}</i>
                    </p>
                        <span className="product-image">
                           <img className={this.props.products.image_front_small_url ? "" : "blank-image"} src={this.props.products.image_front_small_url ? this.props.products.image_front_small_url : "http://www.chipset-v.ru/img/nopic.png"} alt="image_product"/>
                        </span>
                     <span>
                         <p>Par {this.props.products.nutrition_data_per}</p>
                         {  this.props.products.nutriments.fat && this.props.products.nutrient_levels.fat ?
                             <p>
                             <img alt="icon-nutriments"
                             src={`https://static.openfoodfacts.org/images/misc/${this.props.products.nutrient_levels.fat}.svg`}/>
                             Matières
                             grasses {this.props.products.nutriments.fat} {this.props.products.nutriments.fat_unit}
                             </p>
                             :
                             ""
                         }
                         {
                             this.props.products.nutriments['saturated-fat'] && this.props.products.nutrient_levels['saturated-fat'] ?
                             <p>
                                 <img alt="icon-nutriments" src={`https://static.openfoodfacts.org/images/misc/${this.props.products.nutrient_levels['saturated-fat']}.svg`} />
                                 Acides gras saturés {this.props.products.nutriments['saturated-fat']} {this.props.products.nutriments['saturated-fat_unit']}
                             </p>
                             :
                             ""
                         }

                         { this.props.products.nutrient_levels.sugars && this.props.products.nutrient_levels.sugars ?

                             <p>
                                 <img alt="icon-nutriments" src={`https://static.openfoodfacts.org/images/misc/${this.props.products.nutrient_levels.sugars ? this.props.products.nutrient_levels.sugars : "low"}.svg`}/>
                                 Sucre {this.props.products.nutriments.sugars ? this.props.products.nutriments.sugars : "0" } {this.props.products.nutriments.sugars_unit ? this.props.products.nutriments.sugars_unit : "g"}
                             </p>
                             : ""
                         }

                         {
                             this.props.products.nutrient_levels.salt ?
                             <p>
                                 <img alt="icon-nutriments" src={`https://static.openfoodfacts.org/images/misc/${this.props.products.nutrient_levels.salt ? this.props.products.nutrient_levels.salt : "low"}.svg`}/>
                                 Sel {this.props.products.nutriments.salt ? this.props.products.nutriments.salt : "0"} {this.props.products.nutriments.salt_unit ? this.props.products.nutriments.salt_unit : "g"}
                             </p>
                             :
                             ""
                         }


                     </span>
                    <a href={this.props.products.url} target="_blank">Descriptif complet</a>
                    </span>
                </div>
            )
        
    }
});

module.exports = RenderProducts;