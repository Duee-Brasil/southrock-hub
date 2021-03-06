import { ICategory } from "@types";
import { db } from "@utils";
import { doc, getDoc, getDocs, query, setDoc, where, collection } from "firebase/firestore";
import { useMutation, useQuery } from "react-query";

const collectionName = "categories";

const createCategory = async (categoria: ICategory) => {
  const target = doc(db, collectionName, categoria.slug);

  return await setDoc(target, categoria)
    .then((res) => {
      return res;
    })
    .catch((error) => error);
};

const findCategoryByID = async (id: string) => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    return {};
  }
};

const findCategories = async (marca: string) => {
  const docRef = query(
    collection(db, collectionName),
    where("marcaSlug", "==", marca)
  );
  const querySnapshot = await getDocs(docRef);

  let list: ICategory[] = [];
  querySnapshot.forEach((doc) => {
    list.push(doc.data() as ICategory);
  });

  return list;
};

export function useCreateCategory() {
  return useMutation(createCategory);
}

export function useGetCategoryByID() {
  return useMutation(findCategoryByID);
}

export function useGetCategories(marca: string) {
  return useQuery("findCategories", () => findCategories(marca));
}
