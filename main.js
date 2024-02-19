let hamburger;
let nameStuffing;
let nameTopping;
let addWord;

class Hamburger {
    constructor(size, stuffing, topping) {
        this.size = size;
        this.stuffing = stuffing;
        this.topping = topping;
    }

    static SIZE_SMALL = {
        name: "маленький",
        price: 50,
        calories: 20
    }
    static SIZE_BIG = {
        name: "великий",
        price: 100,
        calories: 40
    }

    static STUFFING_CHEESE = {
        name: "сиром",
        price: 10,
        calories: 20
    }

    static STUFFING_SALAD = {
        name: "салатом",
        price: 20,
        calories: 5
    }

    static STUFFING_POTATO = {
        name: "картоплею",
        price: 15,
        calories: 10
    }

    static TOPPING_SAUCE = {
        name: "приправою",
        price: 15,
        calories: 0
    }

    static TOPPING_MAYO = {
        name: "майонезом",
        price: 20,
        calories: 5
    }

    static selectSize() {
        let addSize = prompt(`Оберіть розмір гамбургера ${String.fromCodePoint(127828)}:\n SMALL - маленький\n(ціна: ${this.SIZE_SMALL.price} ₮, калорій: ${this.SIZE_SMALL.calories})\n BIG - великий\n(ціна: ${this.SIZE_BIG.price} ₮, калорій: ${this.SIZE_BIG.calories})`);
        if (addSize === "SMALL") {
            this.size = Hamburger.SIZE_SMALL;
        } else if (addSize === "BIG") {
            this.size = Hamburger.SIZE_BIG;
        } else if (addSize === null) {
            hamburger = new Hamburger(this.size, this.stuffing, this.topping);
            return `Ви відмінили вибір гамбургера ${String.fromCodePoint(127828)}`;
        } else {
            this.selectSize();
        }
        hamburger = new Hamburger(this.size, this.stuffing, this.topping);
        return `Ви обрали ${hamburger.size.name} гамбургер.\n\n${this.calculatePrice()}\n${this.calculate()}`;
    }

    static addStuffing() {
        this.stuffing = [];
        nameStuffing = [];
        let addCheese = confirm(`Зробити з ${this.STUFFING_CHEESE.name}?\n + ${this.STUFFING_CHEESE.price} ₮\n+ ${this.STUFFING_CHEESE.calories} калорій`);
        if (addCheese === true) {
            this.stuffing.push(this.STUFFING_CHEESE);
        }
        let addSalad = confirm(`Зробити з ${this.STUFFING_SALAD.name}?\n + ${this.STUFFING_SALAD.price} ₮\n+ ${this.STUFFING_SALAD.calories} калорій`);
        if (addSalad === true) {
            this.stuffing.push(this.STUFFING_SALAD);
        }
        let addPotato = confirm(`Зробити з ${this.STUFFING_POTATO.name}?\n + ${this.STUFFING_POTATO.price} ₮\n+ ${this.STUFFING_POTATO.calories} калорій`);
        if (addPotato === true) {
            this.stuffing.push(this.STUFFING_POTATO);
        }
        if (this.stuffing.length === 0) {
            alert("Ви не вибрали ні одної начинки, потрібно вибрати як мінімум одну");
            this.addStuffing();
        } else {
            this.stuffing.forEach(element => {
                nameStuffing.push(element.name);
            });
        }
        hamburger = new Hamburger(this.size, this.stuffing, this.topping);
        return `Ви обрали ${hamburger.size.name} гамбургер з ${(nameStuffing).join(", ")}.\n\n ${this.calculatePrice()}\n ${this.calculate()}`;
    }

    static addTopping() {
        this.topping = [];
        nameTopping = [];
        let addSauce = confirm(`Посипати ${this.TOPPING_SAUCE.name}?\n + ${this.TOPPING_SAUCE.price} ₮\n + ${this.TOPPING_SAUCE.calories} калорій`);
        if (addSauce === true) {
            this.topping.push(this.TOPPING_SAUCE);
        }
        let addMayo = confirm(`Полити ${this.TOPPING_MAYO.name}?\n + ${this.TOPPING_MAYO.price} ₮\n + ${this.TOPPING_MAYO.calories} калорій`);
        if (addMayo === true) {
            this.topping.push(this.TOPPING_MAYO);
        }
        hamburger = new Hamburger(this.size, this.stuffing, this.topping);
        this.topping.forEach(element => {
            nameTopping.push(element.name);
        });
        (nameTopping.length > 0) ? addWord = " та з " : addWord = "";
        return `Ви обрали ${hamburger.size.name} гамбургер з ${(nameStuffing).join(", ")}${addWord}${(nameTopping).join(", ")}.\n\n ${this.calculatePrice()}\n ${this.calculate()}`;
    }

    static getEditHamburger() {
        let editHamb = prompt("Хочете щось змінити?\n SIZE - розмір\n STUF - начинка\n TOP - приправи");
        switch (editHamb) {
            case "SIZE":
                this.selectSize();
                this.getEditHamburger();
                break;
            case "STUF":
                this.addStuffing();
                this.getEditHamburger();
                break;
            case "TOP":
                this.addTopping();
                this.getEditHamburger();
                break;
            case null:
                break;
            default:
                this.getEditHamburger();
        }
    }

    static calculatePrice() {
        let price = 0;
        for (let key in hamburger) {
            if (hamburger[key]) {
                (Array.isArray(hamburger[key]) !== true) ?
                    price += hamburger[key].price :
                    hamburger[key].forEach(element => {
                        for (let key in element) {
                            if (key === "price") {
                                price += element[key];
                            }
                        }
                    });
            }
        }
        return `Ціна ${String.fromCodePoint(127828)}: ${price} ₮`;
    }

    static calculate() {
        let calories = 0;
        for (let key in hamburger) {
            if (hamburger[key]) {
                (Array.isArray(hamburger[key]) !== true) ?
                    calories += hamburger[key].calories :
                    hamburger[key].forEach(element => {
                        for (let key in element) {
                            if (key === "calories") {
                                calories += element[key];
                            }
                        }
                    });
            }
        }
        return `Містить ${calories} калорій`;
    }
}

if (!hamburger) {
    alert(`${Hamburger.selectSize()}`);
}

if (hamburger.size && !hamburger.stuffing && !hamburger.topping) {
    alert(`${Hamburger.addStuffing()}`);
}

if (hamburger.size && hamburger.stuffing && !hamburger.topping) {
    alert(`${Hamburger.addTopping()}`);
}

if (hamburger.size && hamburger.stuffing && hamburger.topping) {
    Hamburger.getEditHamburger();
    alert(`Ви обрали ${hamburger.size.name} гамбургер з ${(nameStuffing).join(", ")}${addWord}${(nameTopping).join(", ")}.\n\n ${Hamburger.calculatePrice()}\n ${Hamburger.calculate()}`);
}
alert("Дякую за Ваш вибір!\nГарного дня!");