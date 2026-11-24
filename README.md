# isabellesbeadshop
E-commerce site for a small jewelry shop

- [isabellesbeadshop](#isabellesbeadshop)
  - [Installation](#installation)
  - [Resources](#resources)
## Deployed Application  
https://isabellesbeadshop.onrender.com/
## Installation

1. download and install node
2. clone the repository 
3. in the terminal go to the cloned repository location
4. enter the following command to install all the dependencies `npm run install`
5. enter the following command to run the program `npm run dev`

## Resources

- tailwindcss: https://tailwindcss.com
- Material Tailwind : https://www.material-tailwind.com
- Hannah's big brain : [https://github.com/hannahschwen](https://github.com/hannahschwen)

## Featured products and sales

- In Admin, add or edit a product and check **Feature this product on the homepage**. Uncheck it to remove it from the Featured Products section.
- Lower a product's price and save to start a sale. Product cards, product pages, and the admin list show the original price crossed out beside the current price.
- Further discounts preserve the original price. To finish a sale, check **End sale and restore** when editing the product; saving restores the original price. Setting the price at or above the original price also ends the sale.
- Existing products work without reseeding. Restart the backend and rebuild the client together so the new API fields are available.
- Run the sale pricing checks with `node --test server/utils/salePricing.test.js`.
