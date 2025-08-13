import React, { FC } from "react";
import Image from "next/image";
import { Blog } from "@/types/blog";
import { format } from "date-fns";
import Link from "next/link";

const BlogCard: FC<{ blog: Blog }> = ({ blog }) => {
    const { title, coverImage, date, slug, tag } = blog;
    return (
        <Link href={`/blog/${slug}`} aria-label="blog cover 5xl:h-full 5xl:inline-block" className="gap-4 group">
            <div className="overflow-hidden rounded-2xl h-72 max-h-72 flex-shrink-0 relative">
                <Image
                    src={coverImage!}
                    alt="image"
                    className="transition group-hover:scale-110"
                    width={190}
                    height={163}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    unoptimized={true}
                />
                <div className='absolute top-2 right-2 flex'>
                    <div className="rounded-full bg-main dark:bg-white/15 px-2 py-1">
                        <p className="text-xs font-semibold text-white">{tag}</p>
                    </div>
                </div>
            </div>


            <div className="flex justify-between items-center">
                <div>
                    <h3 className="mt-2 text-lg font-medium text-dark dark:text-white group-hover:text-primary">
                        {title}
                    </h3>
                </div>

            </div>
        </Link>
    );
};

export default BlogCard;
