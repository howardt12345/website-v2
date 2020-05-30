import firebase from "gatsby-plugin-firebase";
import { currentTime } from '@utils';

class PictureManager {
  constructor(url, token, menu) {
    this.url = url;
    this.token = token;
    this.menu = menu;
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
  firebase
  .firestore()
  .collection("photos")
  .orderBy('category')
  .onSnapshot(snapshot1 => {
    const categories = snapshot1.docs.map(doc => ({
      ...doc.data()
    }));
    categories.forEach((item) => {
      let categoryName = item.category;
      let icon = item.icon;
      let subcategories = item.subcategories;

      let subTmp = new Map();

      subTmp.set( icon, [new Picture({ name: icon, time: currentTime() })] );

      if(subcategories.length !== 0) {
        subcategories.sort();

        subcategories.forEach((subcategory) => {
          firebase
            .firestore()
            .collection("photos")
            .doc(categoryName)
            .collection(subcategory)
            .onSnapshot(snapshot2 => {
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
              subTmp.get(icon).concat(pictures);
            });
        });
      }

      try {
        firebase
        .firestore()
        .collection("photos")
        .doc(categoryName)
        .collection("images")
        .onSnapshot(snapshot3 => {
          const images = snapshot3.docs.map(doc => ({
            ...doc.data()
          }));
          images.forEach((image) => {
            try {
              console.log(JSON.stringify(image));
              if(image.name !== 'null') {
                subTmp.get(icon).push(new Picture({
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
            } catch(e) {
              console.log(e);
            }
          });
        });
      } catch (e) {
        console.log(e);
      }
      
      subTmp.get(icon).sort((a, b) => b.time.localeCompare(a.time))

      menu.set(categoryName, subTmp);
    });
  });

  return new PictureManager(url, token, menu);
}

export default fromFirestore;