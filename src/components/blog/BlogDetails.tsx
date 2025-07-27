
import { Calendar, Tag } from "lucide-react";
import type { TBlog } from "../../types/blog.type";
import getFormattedDate from "../../utils/getFormattedDate";
import getCategory from "../../utils/getCategory";
import getCategoryColor from "../../utils/getCategoryColor";
import { baseUrl } from "../../redux/features/api/apiSlice";
import getBlogImgPath from "../../utils/getBlogImgPath";
import blog_placeholder from "../../assets/images/blog_placeholder.png";


type TProps = {
  blog: TBlog
}


const BlogDetails = ( {blog}: TProps) =>{

  const blogImg = blog?.image?.length > 0 ? baseUrl+ getBlogImgPath(blog?.image[0]) : blog_placeholder
  return (
    <div className="bg-gradient-to-br from-slate-50 to-white">
      <main className="max-w-6xl mx-auto px-4 py-8">
        <article className="bg-white rounded-2xl overflow-hidden">
          <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
            <img
              src={blogImg}
              alt={"blog_img"}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Article Content */}
          <div className="p-6 md:p-8 lg:p-12">
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                <span className={` ${getCategoryColor(blog?.category)} px-3 py-1 rounded-full font-medium `}>
                  {getCategory(blog?.category)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{getFormattedDate(blog?.createdAt)}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              {blog?.title}
            </h1>
            {/* Content */}
            <div
              // className="prose prose-lg max-w-none
              //   prose-headings:text-gray-900 prose-headings:font-bold
              //   prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
              //   prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
              //   prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
              //   prose-strong:text-gray-900 prose-strong:font-semibold
              //   prose-em:text-gray-800
              //   prose-ol:space-y-4 prose-ul:space-y-4
              //   prose-li:text-gray-700 prose-li:leading-relaxed
              //   prose-li:pl-2
              //   prose-ol:pl-6 prose-ul:pl-6
              //   prose-li:marker:text-blue-600
              // "
              dangerouslySetInnerHTML={{ __html: blog?.descriptions }}
            />
          </div>
        </article>

      </main>
    </div>
  )
}


export default BlogDetails;