import Image from "next/image";
import Link from "next/link";
import { gql } from "@apollo/client";

import { apolloClient } from "@utils/apollo-client";

function HomePage({ products }) {
  return (
    <div className="bg-gray-100">
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-24">
        <div className="space-y-12">
          <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Latest Products
            </h2>
            <p className="text-xl text-gray-700">
              Ornare sagittis, suspendisse in hendrerit quis. Sed dui aliquet
              lectus sit pretium egestas vel mattis neque.
            </p>
          </div>
          <ul className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3 lg:gap-8">
            {products.edges.map(({ node }) => (
              <li
                key={node.id}
                className="grid text-center transition duration-150 ease-in-out transform bg-white rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-px xl:text-left"
              >
                <div className="grid">
                  <div className="relative h-0 aspect-w-4 aspect-h-3">
                    <div className="absolute inset-0 flex">
                      <Image
                        width={600}
                        height={400}
                        src={node.images.edges[0].node.originalSrc}
                        alt={node.images.edges[0].node.altText}
                        className="flex-1 object-cover rounded-t-lg"
                      />
                    </div>
                  </div>
                  <div className="px-6 py-10 space-y-10 xl:px-10">
                    <div className="space-y-1 text-lg font-medium leading-6">
                      <h3 className="text-gray-900">{node.title}</h3>
                      <p className="text-indigo-400">
                        $
                        {Number(node.priceRange.minVariantPrice.amount).toFixed(
                          2
                        )}
                      </p>
                    </div>
                    <div>
                      <Link href={`/products/${node.handle}`}>
                        <a className="inline-flex items-center justify-center w-full px-4 py-2 text-base font-medium text-center text-indigo-700 duration-150 ease-in-out transform bg-indigo-100 border border-transparent rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:-translate-y-px hover:shadow">
                          Buy now
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`
      query GetProducts {
        products(first: 250) {
          edges {
            node {
              handle
              id
              images(first: 5) {
                edges {
                  node {
                    altText
                    id
                    originalSrc
                  }
                }
              }
              priceRange {
                minVariantPrice {
                  amount
                }
              }
              title
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      products: data.products,
    },
    revalidate: 60,
  };
}

export default HomePage;
export { getStaticProps };
