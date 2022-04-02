import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Javascript",
    description: "",
    linkCategory: "/explore/javascript",
    image:
      "https://res.cloudinary.com/diyo6qdy1/image/upload/v1647986086/videolib/category/Js_1_tjztfc.png",
  },
  {
    _id: uuid(),
    categoryName: "Node",
    description: "",
    linkCategory: "/explore/node",
    image:
      "https://res.cloudinary.com/diyo6qdy1/image/upload/v1647986093/videolib/category/node_1_ihy3ql.png",
  },
  {
    _id: uuid(),
    categoryName: "Python",
    description: "",
    linkCategory: "/explore/python",
    image:
      "https://res.cloudinary.com/diyo6qdy1/image/upload/v1647986094/videolib/category/python_1_oa0pmw.png",
  },
  {
    _id: uuid(),
    categoryName: "React",
    description: "",
    linkCategory: "/explore/react",
    image:
      "https://res.cloudinary.com/diyo6qdy1/image/upload/v1648878781/videolib/category/react_2_ouunfv.png",
  },
];
