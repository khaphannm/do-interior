const DYNAMIC_CATEGORY = "dynamicCategory";
const setDynamicCategory = token => {
    if (localStorage) {
      localStorage.setItem(DYNAMIC_CATEGORY, token);
    }
};

const getDynamicCategory = () => {
    if (localStorage) {
      return localStorage.getItem(DYNAMIC_CATEGORY);
    }
  
    return [];
};

export {setDynamicCategory, getDynamicCategory}