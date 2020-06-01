import firebase from "gatsby-plugin-firebase";
import { currentTime, replaceAll } from '@utils';

class PictureManager {
  constructor(url, token, menu) {
    this.url = url;
    this.token = token;
    this.menu = menu;
  }

  getCategories = () => [...this.menu.keys()];
  getCategory = (index) => [...this.menu.keys()][index];

  getSubcategoriesAt = (category) => [...this.menu.get(category).keys()];
  getSubcategoriesFrom = (index) => [...this.menu.get([...this.menu.keys()][index]).keys()];

  getPicturesAt = (category, subcategory) => this.menu.get(category).get(subcategory);
  getPicturesFrom = (category, subcategory) => this.menu.get([...this.menu.keys()][category]).get([...this.menu.get([...this.menu.keys()][category]).keys()][subcategory]);

  getAllPicturesAt = (category) => this.getPicturesAt(category, 'icon').slice(1);
  getAllPicturesFrom = (index) => this.getPicturesAt(this.getCategory(index), 'icon').slice(1);

  getAllUrlsAt = (category) => [this.getAllPicturesAt(category).map((pic) => `${this.url}${replaceAll(pic.path, '/', '%2F')}%2F${replaceAll(pic.name, ' ', '%20')}?alt=media&token=${this.token}`)];
  getAllUrlsFrom = (index) => [this.getAllPicturesFrom(index).map((pic) => `${this.url}${replaceAll(pic.path, '/', '%2F')}%2F${replaceAll(pic.name, ' ', '%20')}?alt=media&token=${this.token}`)];
  getUrlsFor = (pictures) => [pictures.map((pic) => `${this.url}${replaceAll(pic.path, '/', '%2F')}%2F${replaceAll(pic.name, ' ', '%20')}?alt=media&token=${this.token}`)];

  getAllPictures = () => {
    let tmp = [];
    this.getCategories().forEach(category => tmp = tmp.concat(this.getAllPicturesAt(category)));
    return tmp;
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
    for await (const item of categories) {let categoryName = item.category;
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
              pictures.sort((a, b) => b.time.localeCompare(a.time))
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