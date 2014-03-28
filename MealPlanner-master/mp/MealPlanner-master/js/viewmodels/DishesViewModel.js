function DishesViewModel(){

	var dishes = ko.observableArray([]);
	var components = ko.observableArray();
	var selectedComp = ko.observable();
	var time = ko.observable();
	var limitation = settingsVM.limitation;

	var choose = {
		components: ko.observableArray(),
		types: ko.observableArray(),
		time: ko.observableArray(['Breakfest', 'Dinner', 'Supper'])
	};

	var filter = {
		excludeComp: ko.observableArray(),
		type: ko.observable(),
		name: ko.observable()
	};

	var addDish = function(){
		this.time = time();
		this.date = rationVM.selectedDate();
		dataStore.addedDishes.push(this);
		console.log(dataStore.addedDishes());
	};

	var total = ko.computed(function(){
		return {
			protein: rationVM.total.protein(),
			fats: rationVM.total.fats(),
			carbohydrate: rationVM.total.carbohydrate(),
			kcal: rationVM.total.kcal(),
		}
	});

	var allowed = function(prop, num){
		return total()[prop] + num > limitation[prop]();
	};

	var showmsg = ko.computed(function(){
		for (var key in total()){
			if ( allowed(key, total()[key]) ){
				return key;
			}
		}		

	});

	var filteredDishes = ko.computed(function(){
		var names = ko.utils.arrayFilter(dishes(), function(item) {
			return !filter.name() ? true : (item.name.indexOf(filter.name()) != -1);
		});

		var types = ko.utils.arrayFilter(names, function(item) {
			return !filter.type() ? true : (item.type.indexOf(filter.type()) != -1);
		});

		var result = ko.utils.arrayFilter(types, function(item) {
			return !filter.excludeComp() ? true : (item.components.indexOf(filter.excludeComp()) < 0);
		});

		return result;
	});

	return {
		dishes: dishes,
		time: time,
		addDish: addDish,
		limitation: limitation,
		filteredDishes: filteredDishes,
		choose: choose,
		filter: filter,
		total: total,
		allowed: allowed,
		showmsg: showmsg
	}
};


var dishesVM = new DishesViewModel();

var items = [{
	"name": "Skinny Soup",
	"img": "css/img/photo2.jpg",
	"type": "Main Dish, Soup",
	"components": ["beef broth,",
	"tomato (with juice),",
	"tomato paste,",	
	"chopped cabbage,",	
	"chopped onion,",
	"sliced carrots,",
	"green beans,",
	"chopped zucchini,",
	"basil,",
	"oregano,",
	"salt,",
	"pepper"	
	],
	"protein": 4.0,
	"fats": 1.0,
	"carbohydrate": 8.0,
	"kcal": 51.0
}, 

{
	"name": "Broccoli Cheese Soup",
	"img": "css/img/photo2.jpg",
	"type": "Main Dish, Soup",
	"components": ["broccoli cut into bite sized pieces,",
	"chicken bouillon cube,",
	"milk,",
	"cream of chicken soup,",
	"tablespoons cornstarch,",
	"ounces cheddar cheese,",
	"carrot"],
	"protein": 16.4,
	"fats": 20.0,
	"carbohydrate": 14.9,
	"kcal": 302.0
}, 

{
	"name": "Chicken Chili",
	"img": "css/img/photo2.jpg",
	"type": "Main Dish, Soup",
	"components": ["Chicken breasts,",
	"large onion,",
	"green pepper,",
	"ounce kidney beans,",
	"ounce black beans,", 
	"ounces tomatoes,", 
	"teaspoons garlic powder,",
	"teaspoons cumin,",
	"teaspoons chili powder"
],
	"protein": 15.3,
	"fats": 2.8,
	"carbohydrate": 28.7,
	"kcal": 190.0
}, 

{
	"name": "Gazpacho",
	"img": "css/img/photo2.jpg",
	"type": "Main Dish, Soup",
	"components": ["large red bell pepper,",
	"large tomatoes or 6 plum tomatoes,",
	"large cucumber, peeled, halved lengthwise,",
	"yellow onion,",
	"tomato juice,",
	"chopped fresh cilantro, without stems,",
	"balsamic vinegar,",
	"tablespoons fresh lime juice,",
	"Salt and pepper",
],
	"protein": 2.3,
	"fats": 14.4,
	"carbohydrate": 4.3,
	"kcal": 59.0
}, 

{
	"name": "Carrot and Coriander Soup",
	"img": "css/img/photo2.jpg",
	"type": "Vegetables, Soup",
	"components": ["onion, sliced",
	"carrots,",
	"coriander,",
	"water,",
	"black pepper,",
	"bisto",
],
	"protein": 2.7,
	"fats": 0.5,
	"carbohydrate": 26.2,
	"kcal": 114.0
}, 

{
	"name": "African Peanut and Sweet Potato Soup",
	"img": "css/img/photo2.jpg",
	"type": "Main Dish, Soup",
	"components": [
"coconut oil,",
"cloves garlic,",
"onion, chopped,",
"fresh grated ginger,",
"low sodium chicken broth,",
"jarred unsalted tomatoes,",
"sweet potatoes,",
"unsalted smooth peanut butter,",
"cumin,",
"ground coriander,",
"salt,",
"cayenne pepper,",
"cinnamon,",
"swiss chard"
],
	"protein": 7.8,
	"fats": 9.4,
	"carbohydrate": 28.1,
	"kcal": 216.7
}, 

{
	"name": "Israeli Salad",
	"img": "css/img/photo2.jpg",
	"type": "Salads",
	"components": ["cucumbers,",
"tomatoes",
"green bell pepper",
"tablespoon extra virgin olive oil",
"tablespoons lemon juice"],
	"protein": 1.1,
	"fats": 4.9,
	"carbohydrate": 6.5,
	"kcal": 43.0
},

 {
	"name": "Southwestern Egg Salad",
	"img": "css/img/photo2.jpg",
	"type": "Salads",
	"components": ["hard-boiled eggs,",
"egg whites,",
"scallions,",
"green chili peppers,",
"cilantro,",
"sweet red peppers,",
"fat-free mayonnaise,",
"salsa,",
"ground cumin,",
"salt,",
"black pepper"],
	"protein": 10.4,
	"fats": 7.3,
	"carbohydrate": 5.7,
	"kcal": 131.0
}, 

{
	"name": "Chicken Curry Salad",
	"img": "css/img/photo2.jpg",
	"type": "Salads",
	"components": ["low fat cottage cheese,",
"curry powder,",
"salt and pepper,",
"spring onions,", 
"walnut halves,",
"apple,",
"chicken"
],
	"protein": 26.3,
	"fats": 7.4,
	"carbohydrate": 6.3,
	"kcal": 197.0
}, 

{
	"name": "Crab Cakes",
	"img": "css/img/photo2.jpg",
	"type": "Appetizers",
	"components": ["Kemp Crab,",
"egg whites",
"low-fat mayonnaise",
"Old Bay Seasoning,",
"Corn flakes,",
"lemon juice"
],
	"protein": 5.2,
	"fats": 3.6,
	"carbohydrate": 10.4,
	"kcal": 98.0
},

{
	"name": "Classic Caponata",
	"img": "css/img/photo2.jpg",
	"type": "Appetizers",
	"components": ["olive oil,",
"eggplant,", 
"onion,", 
"garlic cloves,",
"diced tomatoes,",
"red wine vinegar,",
"capers, ",
"chopped fresh basil,",
"toasted pine nuts"],
	"protein": 1.7,
	"fats": 8.9,
	"carbohydrate": 8.9,
	"kcal": 115.4
},

{
	"name": "Peach Yoghurt Fizz",
	"img": "css/img/photo2.jpg",
	"type": "Appetizers",
	"components": ["sliced peaches,",
"vanilla yogurt,",
"nonfat dry milk powder,",
"teaspoon sugar,",
"club soda"],
	"protein": 12.0,
	"fats": 1.5,
	"carbohydrate": 7.9,
	"kcal": 151.0
},

{
	"name": "Sausage, Mushroom and Broccoli Quiche",
	"img": "css/img/photo2.jpg",
	"type": "Side Dish",
	"components": ["egg whites,",
"cottage cheese,",
"shredded colby cheese,",
"soy milk,",
"flour,",
"garlic,",
"mushrooms,",
"broccoli,",
"sausage"
],
	"protein": 19.2,
	"fats": 14.1,
	"carbohydrate": 6.2,
	"kcal": 142.0
},

{
	"name": "Pumpkin Pie",
	"img": "css/img/photo2.jpg",
	"type": "Dessert",
	"components": ["splenda,",
"cornstarch,",
"pumpkin pie spice,",
"salt,",
"egg beaters,",
"pumpkin,",
"evaporated skim milk"
],
	"protein": 5.0,
	"fats": 0.6,
	"carbohydrate": 28.3,
	"kcal": 155.0
},

{
	"name": "Pancakes",
	"img": "css/img/photo2.jpg",
	"type": "Dessert",
	"components": ["flour,",
"salt,",
"baking powder,",
"egg,",
"canola oil,",
"milk"
],
	"protein": 1.6,
	"fats": 2.5,
	"carbohydrate": 7.6,
	"kcal": 60.0
},

{
	"name": "Tofu Chocolate Mousse",
	"img": "css/img/photo2.jpg",
	"type": "Dessert",
	"components": ["tofu,",
"honey,",
"unsweetened cocoa powder,",
"vanilla extract,",
"raspberries"
],
	"protein": 7.5,
	"fats": 3.5,
	"carbohydrate": 54.6,
	"kcal": 246.0
}];


var a = function(items) {

	var components = [];
	var types = [];

	$.each(items, function(i){

		for(var j=0; j < items[i].components.length; j++) {
			if (components.indexOf(items[i].components[j]) < 0) {
				components.push(items[i].components[j]);
			}
		}

		if (types.indexOf(items[i].type) < 0) {
			types.push(items[i].type);
		}

	});

	dishesVM.dishes(items);
	dishesVM.choose.components(components);
	dishesVM.choose.types(types);
};
a(items)


/*
$.getJSON('./dishes.json', function(items) {

	var components = [];
	var types = [];

	$.each(items, function(i){

		for(var j=0; j < items[i].components.length; j++) {
			if (components.indexOf(items[i].components[j]) < 0) {
				components.push(items[i].components[j]);
			}
		}

		if (types.indexOf(items[i].type) < 0) {
			types.push(items[i].type);
		}

	});

	dishesVM.dishes(items);
	dishesVM.choose.components(components);
	dishesVM.choose.types(types);
});
*/