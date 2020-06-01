import firebase from "gatsby-plugin-firebase";
import { currentTime, replaceAll, capitalize } from '@utils';

const _ = require('lodash');

class PictureManager {
  constructor(url, token, menu) {
    this.url = url;
    this.token = token;
    this.menu = menu;
  }

  /**
   * Gets all the categories of the Picture Manager.
   * @return {!Array<String>} The list of categories.
   */
  getCategories = () => [...this.menu.keys()];
  /**
   * Gets all the categories of the Picture Manager, but capitalzed.
   * @return {!Array<String>} The list of categories but capitalized.
   */
  getCategoriesCapitalized = () => [...[...this.menu.keys()].map(category => capitalize(category))];
  /**
   * Gets all the categories of the Picture Manager, but in lowercase.
   * @return {!Array<String>} The list of categories, but in lowercase.
   */
  getCategoriesLowercase = () => [...[...this.menu.keys()].map(category => category.toLowerCase())];
  /**
   * Gets the category at the given index.
   * @param {Number} index  The index to get category from. 
   * @return {String}       The category name at the given index.
   */
  getCategory = (index) => [...this.menu.keys()][index];

  /**
   * Gets the subcategory at the given category name.
   * @param {String} category The category to get the subcategories from.
   * @return {!Array<String>} The list of subcategories at the given category name.
   */
  getSubcategoriesAt = (category) => [...this.menu.get(category).keys()];  
  /**
  * Gets the subcategory at the given category name, but in lowercase.
  * @param {String} category  The category to get the subcategories from.
   * @return {!Array<String>} The list of subcategories at the given category name, but in lowercase.
  */
  getSubcategoriesAtLowercase = (category) => [...[...this.menu.get(category).keys()].map(s => s.toLowerCase())];
  /**
   * Gets the subcategory at the given category index.
   * @param {Number} index    The index of the category to get the subcategories from.
   * @return {!Array<String>} The list of subcategories at the given category index.
   */
  getSubcategoriesFrom = (index) => [...this.menu.get([...this.menu.keys()][index]).keys()];

  /**
   * Gets the list of pictures at the given category and subcategory keys.
   * @param {String} category     The category to get the pictures from.
   * @param {String} subcategory  The subcategory to get the pictures from.
   * @return {!Array<Picture>}    The list of pictures at the given category and subcategory keys.
   */
  getPicturesAt = (category, subcategory) => this.menu.get(category).get(subcategory);
  /**
   * Gets the list of pictures at the given category and subcategory indices.
   * @param {Number} category     The category to get the pictures from.
   * @param {Number} subcategory  The subcategory to get the pictures from.
   * @return {!Array<Picture>}    The list of pictures at the given category and subcategory indices.
   */
  getPicturesFrom = (category, subcategory) => this.menu.get([...this.menu.keys()][category]).get([...this.menu.get([...this.menu.keys()][category]).keys()][subcategory]);

  /**
   * Gets all the pictures at the given category name.
   * @param {String} category   The category to get the pictures from.
   * @return {!Array<Picture>}  The list of pictures at the given category name.
   */
  getAllPicturesAt = (category) => this.getPicturesAt(category, 'icon').slice(1);
    /**
   * Gets all the pictures at the given category index.
   * @param {Number} index      The category to get the pictures from.
   * @return {!Array<Picture>}  The list of pictures at the given category index.
   */
  getAllPicturesFrom = (index) => this.getPicturesAt(this.getCategory(index), 'icon').slice(1);

  /**
   * Gets all the picture urls in a given category name.
   * @param {String} category   The category to get the pictures from.
   * @return {!Array<String>}   The list of picture urls at the given category name.
   */
  getAllUrlsAt = (category) => [...this.getAllPicturesAt(category).map((pic) => `${this.url}${replaceAll(pic.path, '/', '%2F')}%2F${replaceAll(pic.name, ' ', '%20')}?alt=media&token=${this.token}`)];
  /**
   * Gets all the picture urls in a given category index.
   * @param {Number} index    The category to get the pictures from.
   * @return {!Array<String>} The list of picture urls at the given category index.
   */
  getAllUrlsFrom = (index) => [...this.getAllPicturesFrom(index).map((pic) => `${this.url}${replaceAll(pic.path, '/', '%2F')}%2F${replaceAll(pic.name, ' ', '%20')}?alt=media&token=${this.token}`)];
  /**
   * Gets all the picture urls for a given list of pictures.
   * @param {!Array<Picture>} pictures  The list of pictures to get urls for.
   * @return {!Array<String>}           The list of picture urls for the given list of pictures.
   */
  getUrlsFor = (pictures) => [...pictures.map((pic) => `${this.url}${replaceAll(pic.path, '/', '%2F')}%2F${replaceAll(pic.name, ' ', '%20')}?alt=media&token=${this.token}`)];

  /**
   * Gets all the pictures in the Picture Manager
   * @return {!Array<Picture>} A list of all the pictures in the Picture Manager.
   */
  getAllPictures = () => {
    let tmp = [];
    this.getCategories().forEach(category => tmp = tmp.concat(this.getAllPicturesAt(category)));
    tmp.sort((a, b) => b.time.localeCompare(a.time));
    return tmp;
  }

  /**
   * Gets the true category name from a given query string.
   * @param {String} query  The query string to search.
   * @return {String}       The true category name of the query string.
   */
  trueCategoryName = (query) => {
    let result = ''
    this.getCategories().forEach(category => {
      if(category.toLowerCase().localeCompare(query.toLowerCase()) === 0) {
        result = category;
      }
    });
    return result;
  }

  /**
   * Gets the true subcategory name from a given category and query string. If the query string is "misc", this returns "Miscellaneous".
   * @param {String} category The category to search in.
   * @param {String} query    The query string to search.
   * @return {String}         The true subcategory name of the query string.
   */
  trueSubcategoryName = (category, query) => {
    if(query.toLowerCase().localeCompare('misc')) {
      return 'Miscellaneous';
    } else {
      let result = ''
      this.getSubcategoriesAt(this.trueCategoryName(category)).forEach(sc => {
        if(sc.toLowerCase().localeCompare(query.toLowerCase()) === 0) {
          result = sc;
        }
      });
      return result;
    }
  }

  /**
   * Searches for images in a given query string, and returns whether the query contains any pictures.
   * By default, a trailing forward slash or '/all' will search for the category preceding the forward flash.
   * @param {String} query  The query string to search.
   * @return {Boolean}      Whether the query contains any pictures.
   */
  hasPictures = (query) => {
    let raw = query.split('/');
    if(raw.length === 1) {
      let category = raw[0].toLowerCase();
      return !_.isEmpty(this.trueCategoryName(category));
    } else if(raw.length === 2) {
      let category = raw[0].toLowerCase();
      let subcategory = raw[1].toLowerCase();
      if(_.isEmpty(subcategory) || subcategory.localeCompare("all") === 0) {
        return this.hasPictures(category);
      } else {
        if(this.hasPictures(category)) {
          return !_.isEmpty(this.trueSubcategoryName(category, subcategory));
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  }

  /**
   * Checks if the given query string has any pictures, and returns the list of pictures if so.
   * By default, a trailing forward slash, '/all', or '/icon' will return all the photos in the category.
   * @param {String} query        The query string to search.
   * @return {!Array<Pictures>}   The list of pictures at the given query string. 
   */
  getPicturesQuery = (query) => {
    if(this.hasPictures(query)) {
      let raw = query.split('/');
      if(raw.length === 1) {
        let category = raw[0];
        return this.getAllPicturesAt(this.trueCategoryName(category));
      } else if(raw.length === 2) {
        let category = this.trueCategoryName(raw[0]);
        let subcategory = raw[1];
        if((subcategory.toLowerCase().localeCompare("all") === 0) || (subcategory.toLowerCase().localeCompare("icon") === 0) || _.isEmpty(subcategory)) {
          return this.getAllPicturesAt(category);
        } else {
          return this.getPicturesAt(category, this.trueSubcategoryName(category, subcategory));
        }
      } else {
        return [];
      }
    } else if(query.toLowerCase().localeCompare('all') === 0) {
      return this.getAllPictures();
    }
    else {
      return [];
    }
  }
}

class Picture {
  constructor(data) {
    this.name = (typeof data.name !== 'undefined') ? data.name : '';
    this.title = (typeof data.title !== 'undefined') ? data.title : '';
    this.width = (typeof data.w !== 'undefined') ? data.w : 1;
    this.height = (typeof data.h !== 'undefined') ? data.h : 1;
    this.description = (typeof data.desc !== 'undefined') ? data.desc : '';
    this.buy = (typeof data.buy !== 'undefined') ? data.buy : '';
    this.download = (typeof data.dl !== 'undefined') ? data.dl : '';
    this.time = (typeof data.time !== 'undefined') ? data.time : '';
    this.path = (typeof data.path !== 'undefined') ? data.path : '';
  }
}

const fromFirestore = async (url, token) => {
  let menu = new Map();

  await firebase
  .firestore()
  .collection("photos")
  .orderBy('category')
  .get()
  .then(async (snapshot1) => {
    const categories = snapshot1.docs.map(doc => ({
      ...doc.data()
    }));
    for await (const item of categories) {
      let categoryName = item.category;
      let icon = item.icon;
      let subcategories = item.subcategories;

      let subTmp = new Map();

      subTmp.set( 'icon', [new Picture({ name: icon, time: currentTime() })] );

      if(subcategories.length !== 0) {
        subcategories.sort();

        for await (const subcategory of subcategories) {
          await firebase
            .firestore()
            .collection("photos")
            .doc(categoryName)
            .collection(subcategory)
            .get()
            .then(snapshot2 => {
              const images = snapshot2.docs.map(doc => ({
                ...doc.data()
              }));
              let pictures = [];
              images.forEach((image) => {
                try {
                  console.log(JSON.stringify(image));
                  if(image.name !== 'null') {
                    pictures.push(new Picture({
                      path: `${categoryName}/${subcategory}`,
                      ...image
                    }));
                  }
                } catch (e) {
                  console.log(e);
                }
              });
              pictures.sort((a, b) => b.time.localeCompare(a.time));
              subTmp.set(subcategory, pictures);
              subTmp.set('icon', [...subTmp.get('icon'), ...pictures]);
            });
          }
        }

      try {
        await firebase
        .firestore()
        .collection("photos")
        .doc(categoryName)
        .collection("images")
        .get()
        .then(snapshot3 => {
          const images = snapshot3.docs.map(doc => ({
            ...doc.data()
          }));
          images.forEach((image) => {
            try {
              console.log(JSON.stringify(image));
              if(image.name !== 'null') {
                subTmp.get('icon').push(new Picture({
                  path: `${categoryName}`,
                  ...image
                }));
                if(subcategories.length !== 0) {
                  try {
                    subTmp.get('Miscellaneous').push(new Picture({
                      path: `${categoryName}`,
                      ...image
                    }));
                  } catch(e) {
                    console.log(e);
                    subTmp.set("Miscellaneous", [
                      new Picture({
                        path: `${categoryName}`,
                        ...image
                      })
                    ]);
                  }
                }
              }
              subTmp.get('icon').sort((a, b) => b.time.localeCompare(a.time));
              subTmp.get('Miscellaneous').sort((a, b) => b.time.localeCompare(a.time));
            } catch(e) {
              console.log(e);
            }
          });
        });
      } catch (e) {
        console.log(e);
      }
      
      subTmp.get('icon').sort((a, b) => b.time.localeCompare(a.time))
      menu.set(categoryName, subTmp);
      
    }
  });

  console.log("process done");

  return new PictureManager(url, token, menu);
}

export default fromFirestore;