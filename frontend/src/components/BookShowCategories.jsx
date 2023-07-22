

const categorieData=[
    {
        id:1,
        img:'/assets/fictionOasis.webp',
        title:'Fiction Oasis',
        description: "Immerse yourself in the world of fantasy and adventure. Discover novels by legendary authors, satisfying your inner bibliophile."
    },
    {
        id:2,
        img:'/assets/hiddenArt.webp',
        title:'Hidden Art',
        description:"Explore an impressive collection of vintage volumes adorned with breathtaking illustrations and detailed engravings."
    },
    {
        id:3,
        img:'/assets/natureLibrary.webp',
        title:'Nature Library',
        description: "Investigate the wonders of Mother Earth through the compelling texts of pioneering naturalists and environmental advocates."
    },
    {
        id:4,
        img:'/assets/autobiographicalJourneys.webp',
        title:'Autobiographical Journeys',
        description:"Travel the world through the eyes of renowned explorers, writers, and philosophers as you delve into their fascinating memoirs."
    }

    


    
    
]

function Containers({img, title, description}) {
    return (
        <div
        className="py-[50px] flex flex-col space-y-2 text-left"
        >
            <img src={img} alt=""
            className="w-max h-[200px] object-cover rounded-lg"
             />
            <h1
            className="text-2xl font-semibold mt-2 mb-2 text-left" 
            >{title}</h1>
            <p
            className="w-[315px] text-gray-500"
            >{description}</p>

        </div>
    )
}
function BookShowCategories() {
  return (
    <div className="bg-white px-[150px]">

        <div className='grid grid-cols-2'>
            {categorieData.map((data)=>(
                <Containers
                key={data.id}
                 img={data.img} title={data.title} description={data.description}/>
            ))}
        </div>
        


    </div>
  )
}

export default BookShowCategories