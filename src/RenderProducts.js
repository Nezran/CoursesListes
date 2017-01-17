/**
 * Created by Mickael.LACOMBE on 17.01.2017.
 */

var React = require('react');

var RenderProducts = React.createClass({
    render: function(){    
            if(!this.props.products.nutriments.fat ){
                this.props.products.nutriments.fat = 0;
                this.props.products.nutriments.fat_unit = "g";
                this.props.products.nutrient_levels.fat = "low";
            }

            if(!this.props.products.nutriments['saturated-fat']){
                this.props.products.nutriments['saturated-fat'] = 0;
                this.props.products.nutriments['saturated-fat_unit'] = "g";
                this.props.products.nutrient_levels['saturated-fat'] = "low";
                console.log("dsadasdas :", this.props.products.nutriments['saturated-fat_unit']);
            }
            return (
                <div className="col span_1_of_5 products">
                    <span className="l-box">
                    <p>{this.props.products.product_name_fr ? this.props.products.product_name_fr : 'Produit sans nom'}
                        <i>{this.props.products.quantity}</i>
                    </p>
                    <img src={this.props.products.image_front_small_url ? this.props.products.image_front_small_url : "http://www.chipset-v.ru/img/nopic.png"} alt="image_product"/>
                     <span>
                         <p>
                             <img src={`https://static.openfoodfacts.org/images/misc/${this.props.products.nutrient_levels.fat}.svg`}/>
                             Matières grasses {this.props.products.nutriments.fat} {this.props.products.nutriments.fat_unit}
                         </p>
                         <p>
                             <img src={`https://static.openfoodfacts.org/images/misc/${this.props.products.nutrient_levels['saturated-fat']}.svg`} />
                             Acides gras saturés {this.props.products.nutriments['saturated-fat']} {this.props.products.nutriments['saturated-fat_unit']}
                         </p>
                         <p>
                             <img src={`https://static.openfoodfacts.org/images/misc/${this.props.products.nutrient_levels.sugars ? this.props.products.nutrient_levels.sugars : "low"}.svg`}/>
                             Sucre {this.props.products.nutriments.sugars ? this.props.products.nutriments.sugars : "0" } {this.props.products.nutriments.sugars_unit ? this.props.products.nutriments.sugars_unit : "g"}
                         </p>
                         <p>
                             <img src={`https://static.openfoodfacts.org/images/misc/${this.props.products.nutrient_levels.salt ? this.props.products.nutrient_levels.salt : "low"}.svg`}/>
                             Sel {this.props.products.nutriments.salt ? this.props.products.nutriments.salt : "0"} {this.props.products.nutriments.salt_unit ? this.props.products.nutriments.salt_unit : "g"}
                         </p>
                     </span>
                    <a href={this.props.products.url} target="_blank">Descriptif complet</a>
                    </span>
                </div>
            )
        
    }
});

module.exports = RenderProducts;