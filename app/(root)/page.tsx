import { Collection } from "@/components/shared/Collection"
import { navLinks } from "@/constants"
import { getAllImages } from "@/lib/actions/image.actions"
import Footer from "@/components/shared/Footer";
import Image from "next/image"
import Link from "next/link"

const Home = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || '';

  const images = await getAllImages({ page, searchQuery})

  return (
    <div className="flex flex-col min-h-screen"> {/* Ensures footer can stick to the bottom */}
      <main className="flex-grow">
        <section className="home">
          <h1 className="home-heading">
            Amazingly easy content creation.
          </h1>
          <ul className="flex-center w-full gap-30">
            {navLinks.slice(1, 5).map((link) => (
              <Link
                key={link.route}
                href={link.route}
                className="flex-center flex-col gap-2"
              >
                <li className="flex-center w-fit rounded-full bg-white p-4">
                  <Image src={link.icon} alt="image" width={24} height={24} />
                </li>
                <p className="p-14-medium text-center text-white">{link.label}</p>
              </Link>
            ))}
          </ul>
        </section>

        <section className="sm:mt-12">
          <Collection 
            hasSearch={true}
            images={images?.data}
            totalPages={images?.totalPage}
            page={page}
          />
        </section>
      </main>
      <Footer /> {/* Footer is outside the main content to ensure it sticks at the bottom */}
    </div>
  )
}

export default Home