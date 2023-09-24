import { ICategoryEdit } from "./types.ts"; // Assuming you have a type for editing a category
import * as Yup from "yup";
import http_common from "../../../../http_common.ts";
import { useNavigate, useParams } from "react-router-dom"; // useParams for getting the category ID
import { useFormik } from "formik";
import { ChangeEvent, useEffect, useState } from "react";

const CategoryEditPage = () => {
  const { categoryId } = useParams(); // Get the category ID from the URL

  const [category, setCategory] = useState<ICategoryEdit | null>(null);

  const navigate = useNavigate();

  const categorySchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .max(255, "Name must be smaller"),
    description: Yup.string()
      .required("Description is required")
      .max(4000, "Description must be smaller"),
  });

  const fetchData = async () => {
    try {
      const response = await http_common.get(`api/category/${categoryId}`);
      setCategory(response.data); // Assuming your API returns the category data
    } catch {
      console.log("Server error");
    }
  };

  useEffect(() => {
    fetchData();
  }, [categoryId]);

  const onFormikSubmit = async (values: ICategoryEdit) => {
    try {
      await http_common.put(`api/category/${categoryId}`, values, {
        headers: {
          "Content-Type": "application/json", // Update content type if needed
        },
      });
      navigate("/");
    } catch {
      console.log("Server error");
    }
  };

  const formik = useFormik({
    initialValues: {
      name: category?.name || "",
      description: category?.description || "",
    },
    onSubmit: onFormikSubmit,
    validationSchema: categorySchema,
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
  } = formik;

  return (
    <>
      <div className="mx-auto text-center">
        <h1 className="text-3xl  font-bold text-black sm:text-4xl">
          Edit Category
        </h1>
      </div>

      <form onSubmit={handleSubmit} className={"mt-4"}>
        <i
          className="bi bi-arrow-left-circle-fill back-button"
          onClick={() => navigate("..")}
        ></i>

        <div className="mb-6">
          <input
            onBlur={handleBlur}
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
              errors.name && touched.name
                ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400"
                : ""
            }`}
            type="text"
            placeholder="Name"
            name="name"
            value={values.name}
            aria-label="Name"
            aria-describedby="basic-addon2"
            onChange={handleChange}
          />
          {errors.name && touched.name && (
            <div className={"mt-2 text-sm text-red-600 dark:text-red-500"}>
              {errors.name}
            </div>
          )}
        </div>

        <div className="mb-6">
          <textarea
            onBlur={handleBlur}
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
              errors.description && touched.description
                ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400"
                : ""
            }`}
            placeholder="Description"
            name="description"
            value={values.description}
            aria-label="Description"
            aria-describedby="basic-addon2"
            onChange={handleChange}
          />
          {errors.description && touched.description && (
            <div className={"mt-2 text-sm text-red-600 dark:text-red-500"}>
              {errors.description}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Update
        </button>
      </form>
    </>
  );
};

export default CategoryEditPage;
