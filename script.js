const defaultList = ['milk', 'bread', 'tea', 'whiskey', 'coke'];

if (localStorage.getItem('defaultList') == null || localStorage.getItem('defaultList') === '[]') {
    localStorage.setItem('defaultList', JSON.stringify(defaultList));
}

const shoppingBlock = document.querySelector('.shopping-list');

const shoppingListObject = {
    storageList: JSON.parse(window.localStorage.getItem('defaultList')),
    list: shoppingBlock.querySelector('.shopping-list__list'),
    input: shoppingBlock.querySelector('.shopping-list__add'),
    button: shoppingBlock.querySelector('.shopping-list__button'),
    checkedButton: shoppingBlock.querySelector('.shopping-list__checked'),
    cardContainer: shoppingBlock.querySelector('.card-content'),
    errorMessage: shoppingBlock.querySelector('.error-message'),
    errorMessageCheked: shoppingBlock.querySelector('.error-message-checked'),

    init: function () {
        this.createList();
        this.addItem();
        this.removeCheckedItems();
    },

    createList: function () {
        let self = this;
        this.list.innerHTML = '';

        for (let index = 0; index < this.storageList.length; index++) {
            const element = this.storageList[index];
            this.list.innerHTML += `
                <li>
                    <label class="checkbox"><input type="checkbox" onclick="shoppingListObject.checkItem(this)"> <span>${element}</span></label> 
                    <button class="delete ml-2" onclick="shoppingListObject.deleteItem(this)"></button>
                </li>
            `;
        }
    },

    addItem: function () {
        let self = this;

        const addFunction = function () {
            if (self.input.value) {
                self.storageList.push(self.input.value);
                window.localStorage.setItem('defaultList', JSON.stringify(self.storageList)),
                    self.createList();
                self.input.value = '';

                const noProductHeading = document.querySelector('.subtitle.has-text-centered');

                if (noProductHeading) {
                    noProductHeading.remove();
                }
            } else {
                self.errorMessage.innerHTML = "input is empty, write something!";
            }
        }

        this.button.addEventListener('click', addFunction);
        this.input.addEventListener('keyup', function (e) {
            if (e.keyCode === 13) {
                addFunction();
            }
        });
    },

    deleteItem: function (button) {
        let self = this;

        const itemContent = button.parentElement.textContent
        const itemContentNoFirstSpace = itemContent.trim();
        const getItemIndex = self.storageList.indexOf(itemContentNoFirstSpace);

        this.storageList.splice(getItemIndex, 1);
        window.localStorage.setItem('defaultList', JSON.stringify(self.storageList)),
            button.parentNode.remove();

        if (this.list.children.length < 1) {
            let h3 = document.createElement('h3');
            h3.className = 'subtitle has-text-centered';
            h3.textContent = 'Shopping list is empty 󠀠󠀠🤷‍♂️';
            this.list.after(h3);
        }
    },

    checkItem: function (checkbox) {
        const itemText = checkbox.nextElementSibling;
        itemText.classList.toggle("done");
    },

    removeCheckedItems: function () {
        let self = this;

        this.checkedButton.addEventListener("click", function () {
            const getAllCheckedItem = shoppingBlock.querySelectorAll('.done');
            const getAllCheckedItemArray = [];

            for (let i = 0; i <= getAllCheckedItem.length - 1; i++) {
                getAllCheckedItemArray.push(getAllCheckedItem[i].textContent);
            }

            getAllCheckedItemArray.forEach(function (selected, index) {
                self.storageList = self.storageList.filter(item => item !== selected);
                const selectedNodeParent = shoppingBlock.querySelectorAll('.done')[0].closest('li');
                selectedNodeParent.remove();

            });

            window.localStorage.setItem('defaultList', JSON.stringify(self.storageList));

            if (getAllCheckedItem.length === 0) {
                self.errorMessageCheked.innerHTML = "Nothing checked yet!";
            }
        });
    }

};

shoppingListObject.init();
