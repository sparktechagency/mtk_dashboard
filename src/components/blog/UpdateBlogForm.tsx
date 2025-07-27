import { useForm, type SubmitHandler } from "react-hook-form";
import { useUpdateBlogMutation } from "../../redux/features/blog/blogApi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { SetBlogCreateError } from "../../redux/features/blog/blogSlice";
import CustomInput from "../form/CustomInput";
import { CgSpinnerTwo } from "react-icons/cg";
import { blogSchema } from "../../schemas/blog.schema";
import type { z } from "zod";
import CustomSelect from "../form/CustomSelect";
import { categoryOptions } from "../../data/category.data";
import CustomQuilEditor from "../form/CustomQuilEditor";
import Error from "../validation/Error";
import ImageUpload from "../form/ImageUpload";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { TBlog } from "../../types/blog.type";
import { baseUrl } from "../../redux/features/api/apiSlice";
import getBlogImgPath from "../../utils/getBlogImgPath";
import blog_placeholder from "../../assets/images/blog_placeholder.png";

type TFormValues = z.infer<typeof blogSchema>;

type TProps = {
  blog: TBlog
}

const UpdateBlogForm = ( {blog}: TProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { BlogCreateError } = useAppSelector((state) => state.blog);
  const [updateBlog, { isLoading, isSuccess }] = useUpdateBlogMutation();
  const { handleSubmit, control, setValue, clearErrors, setError, formState: { errors } } = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: blog?.title || "",
      category: blog?.category || "",
      descriptions: blog?.descriptions,
      icon: blog?.image?.length > 0 ? baseUrl+ getBlogImgPath(blog?.image[0]) : ""
    }
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(blog?.image?.length > 0 ? baseUrl+ getBlogImgPath(blog?.image[0]) : blog_placeholder);
    
  
    useEffect(() => {
      if (image !=null) {
        setValue("icon", "This is icon");
        clearErrors("icon");
      }
    }, [image, setValue, setError, clearErrors]);


  const setIconError = () => {
    setValue("icon", "");
    setError("icon", {
      type: "manual",
      message: "Image is required",
    });
  };


  useEffect(()=> {
    if(!isLoading && isSuccess){
      navigate("/blogs")
    }
  }, [isLoading, isSuccess, navigate])


  const onSubmit: SubmitHandler<TFormValues> = (data) => {
    dispatch(SetBlogCreateError(""));
    const formData = new FormData();
    if(image){
      formData.append("image", image as File);
    }
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("descriptions", data.descriptions);
    updateBlog({
      id: blog?._id,
      data: formData
    });
  };

  return (
    <>
      {BlogCreateError && <Error message={BlogCreateError} />}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4">
          <CustomInput
            label="Title"
            name="title"
            type="text"
            control={control}
            placeholder="Enter title"
          />
          <CustomSelect
            label="Category"
            name="category"
            control={control}
            options={categoryOptions}
          />
        </div>
        <div className="mb-6 mt-2">
          <ImageUpload
            preview={preview}
            setPreview={setPreview}
            image={image}
            setImage={setImage}
            title="Blog Image"
            setIconError={setIconError}
          />
          {errors?.icon && (
            <p className="mt-1 text-sm text-red-500">{errors?.icon?.message}</p>
          )}
        </div>
        <CustomQuilEditor
          label="Description"
          name="descriptions"
          control={control}
          height={320}
          placeholder="Write a blog..."
        />

        <button
          type="submit"
          className="w-full flex justify-center items-center gap-x-2 bg-primary hover:bg-[#2b4773] cursor-pointer text-white py-2 rounded-md font-semibold transition-colors duration-100"
        >
          {isLoading ? (
            <>
              <CgSpinnerTwo className="animate-spin" fontSize={16} />
              Processing...
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </form>
    </>
  );
};

export default UpdateBlogForm;
