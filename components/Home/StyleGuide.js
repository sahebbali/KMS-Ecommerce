// import React from "react";
// import Link from "next/link";
// import { BiChevronsRight } from "react-icons/bi";
// import Image from "next/image";
// export default function StyleGuide() {
//   return (
//     <div className="grid grid-cols-1 gap-4 mt-32 md:grid-cols-2">
//       <Link href="/styleguide1" className="hover:cursor-pointer">
//         <div className="flex flex-col items-center justify-center ">
//           <Image
//             width={500}
//             height={500}
//             src="https://d19qnzrkx7fd3b.cloudfront.net/media/images/Style-Guide-153.original.format-jpeg.jpg"
//             alt="Image"
//             className="w-full"
//           />
//           <div className="flex items-center mt-2">
//             Style Guide
//             <BiChevronsRight size={20} />
//           </div>
//         </div>
//       </Link>
//       <Link href="/styleguide2" className="hover:cursor-pointer">
//         <div className="flex flex-col items-center justify-center">
//           <Image
//             width={500}
//             height={500}
//             src="https://d19qnzrkx7fd3b.cloudfront.net/media/images/Style-Guide-152.original.format-jpeg.jpg"
//             alt="Image"
//             className="w-full"
//           />
//           <div className="flex items-center mt-2">
//             Style Guide
//             <BiChevronsRight size={20} />
//           </div>
//         </div>
//       </Link>
//     </div>
//   );
// }
import React from "react";
import Link from "next/link";
import { BiChevronsRight } from "react-icons/bi";
// import videoSrc from '@public/videos/bannervedio1.mp4'
import Image from "next/image";
export default function StyleGuide() {
  return (
    <>
        <div className="grid grid-cols-1 gap-6 h-60 mt-32 mb-16 ml-8 md:grid-cols-2">
       <div className="relative h-[400px]">
          <video className="w-[500px] h-[330px] " controls>
            <source src='./videos/bannervedio1.mp4' type="video/mp4" />
          </video>
        </div>
       <div className="relative h-[400px]">
          <video className="w-[500px] h-[330px] " controls>
            <source src='./videos/bannervedio2.mp4' type="video/mp4" />
          </video>
        </div>
    </div>
    <div className="h-[fit-contain] w-full mt-4 pt-[70px] ">
      <Image src='./videos/bannervedio2.png' height={200} width={1300} className="w-full pt-[20] " alt="banner2"/>
    </div>
    </>
  );
}
