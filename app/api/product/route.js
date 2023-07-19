export async function GET(request) {
    try {
      await connect();
      // console.log(request.url);
  
      // Extract query parameters
      const searchParams = new URL(request.url).searchParams;
      const page = searchParams.get("page") || 1;
  
      const perPage = 10;
  
      // Calculate skip value for pagination
      const skip = (page - 1) * perPage;
  
      // Fetch products with pagination
      const products = await Products.find({status: "pending"}).skip(skip).limit(perPage);
  
      // Get total number of products
      const totalProducts = await Products.countDocuments({status: "pending"});
  
      // Calculate total number of pages
      const totalPages = Math.ceil(totalProducts / perPage);
  
      return NextResponse.json({
        products,
        currentPage: parseInt(page),
        totalPages,
        perPage,
      });
    } catch (err) {
      console.log(err);
      return new NextResponse(JSON.stringify({ error: "Database Error" }), {
        status: 500,
      });
    }
  }