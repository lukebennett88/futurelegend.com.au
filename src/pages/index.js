import Image from "next/image";
import { gql } from "@apollo/client";

import { apolloClient } from "../utils/apollo-client";

function HomePage({ products }) {
  return (
    <>
      {/* This example requires Tailwind CSS v2.0+ */}
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
              {products.edges.map((edge) => (
                <li
                  key={edge.node.id}
                  className="grid text-center transition duration-150 ease-in-out transform bg-white rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-px xl:text-left"
                >
                  <div className="grid">
                    <div className="relative h-0 aspect-w-4 aspect-h-3">
                      <div className="absolute inset-0 flex">
                        <Image
                          width={600}
                          height={400}
                          src={edge.node.images.edges[0].node.originalSrc}
                          alt={edge.node.images.edges[0].node.altText}
                          className="flex-1 object-cover rounded-t-lg"
                        />
                      </div>
                    </div>
                    <div className="px-6 py-10 xl:px-10 xl:grid xl:grid-cols-2 xl:gap-4 xl:items-center xl:justify-between">
                      <div className="space-y-1 text-lg font-medium leading-6">
                        <h3 className="text-gray-900">{edge.node.title}</h3>
                        <p className="text-indigo-400">
                          $
                          {Number(
                            edge.node.priceRange.minVariantPrice.amount
                          ).toFixed(2)}
                        </p>
                      </div>
                      <div className="grid items-end h-full">
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 text-base font-medium text-indigo-700 duration-150 ease-in-out transform bg-indigo-100 border border-transparent rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:-translate-y-px hover:shadow"
                        >
                          Button text
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`
      query GetProducts {
        products(first: 8) {
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
