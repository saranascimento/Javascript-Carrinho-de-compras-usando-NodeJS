const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK'];

function getShoppingCart(ids, productsList) {
	let finalList = {
		products: [],
		promotion: '',
		totalPrice: 0,
		discountValue: '',
		discount: ''
	}

	
	let productFiltered = filterProductByID(ids, productsList, finalList)

	finalList.promotion = filterByCategory(finalList.products)

	finalList.totalPrice = `${sumPriceByPromotion(finalList.promotion, productFiltered).toFixed(2)}`

	finalList.discountValue = `${calculateDiscount(productFiltered, finalList.totalPrice).toFixed(2)}`

	finalList.discount = `${calculatePercentageDiscount(finalList.discountValue, finalList.totalPrice).toFixed(2)}%`

	return finalList
}

function filterProductByID(ids, productsList, finalList) {
	let productFiltered = []
	ids.map( id => {
		product = productsList.filter(product => product.id === id) 
		product.map(product => {
			finalList.products.push({name: product.name, category: product.category})
		})
		productFiltered.push(product)

	})

	return productFiltered
}


function filterByCategory(productList) {
	let unique = [...new Set(productList.map(a => a.category))];
	return promotions[unique.length - 1]
}

function sumPriceByPromotion(promotionType, productFiltered){
	
	let totalPrice = 0
	
	productFiltered.map(product => {
		let foundPromotion = false
		product[0].promotions.map(promotion => {
			if(promotion.looks.includes(promotionType)){
				totalPrice += promotion.price
				foundPromotion = true
			}
		})

		if(!foundPromotion){
			totalPrice += product[0].regularPrice
		}
	})
	return totalPrice
}

function calculateDiscount(products, promotionPrice) {
	let totalRegularPrice = 0

	products.map(product => {
		totalRegularPrice +=  product[0].regularPrice
	})
	 
	return totalRegularPrice - promotionPrice
}

function calculatePercentageDiscount(discount, totalPrice) {
	return (parseFloat(discount)*100) / (parseFloat(discount) + parseFloat(totalPrice))
}

module.exports = { getShoppingCart }
