import * as React from "react";
import Head from "next/head";
import Image from "next/image";
import { gql, useMutation } from "@apollo/client";

import { apolloClient } from "@utils/apollo-client";

function ProductPage({ product }) {
  // Number of items to add to cart
  const [quantity, setQuantity] = React.useState(1);

  // Currently selected image
  const [activeImage, setActiveImage] = React.useState(
    product.images.edges[0].node
  );
  // Variant to add to cart
  const [variantId, setVariantId] = React.useState(
    product.variants.edges[0].node.id
  );

  // Mutation to run
  const ADD_TODO = gql`
    mutation($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
          webUrl
          lineItems(first: 250) {
            edges {
              node {
                title
                quantity
              }
            }
          }
        }
      }
    }
  `;

  // Mutation to create a new checkout
  const [createCheckout, { data }] = useMutation(ADD_TODO);

  function handleCreateCheckout() {
    createCheckout({
      variables: {
        input: {
          lineItems: [
            {
              variantId,
              quantity,
            },
          ],
        },
      },
    });
  }

  // State to show checkout button
  const [showCheckout, setShowCheckout] = React.useState(false);

  React.useEffect(() => {
    if (data?.checkoutCreate?.webUrl) {
      setShowCheckout(true);
    }
  }, []);

  console.log(data);

  return (
    <>
      <Head>
        <title>{product.title}</title>
      </Head>
      <div className="relative py-16">
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="mx-auto text-lg max-w-prose">
            <h1>
              <span className="block text-base font-semibold tracking-wide text-center text-indigo-600 uppercase">
                {product.title}
              </span>
              <span className="block mt-2 text-3xl font-extrabold leading-8 tracking-tight text-center text-gray-900 sm:text-4xl">
                $
                {Number(product.priceRange?.minVariantPrice?.amount).toFixed(2)}
              </span>
            </h1>
          </div>
        </div>
        <div className="grid w-full gap-8 mt-16 lg:grid-cols-2">
          <div className="grid gap-4 lg:grid-cols-5">
            <div className="space-y-4">
              {product.images.edges.map(({ node }) => (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setActiveImage(node)}
                  className="relative block focus:ring-inset focus:z-10"
                >
                  <Image
                    width={600}
                    height={400}
                    src={node.originalSrc}
                    alt={node.altText}
                    className="object-cover mx-auto mt-4 rounded-lg"
                  />
                </button>
              ))}
            </div>
            <div className="lg:col-span-4">
              <Image
                width={600}
                height={400}
                src={activeImage.originalSrc}
                alt={activeImage.altText}
                className="object-cover mx-auto rounded-lg"
              />
            </div>
          </div>
          <div className="space-y-8">
            <div>
              <span className="block font-semibold tracking-wider text-indigo-600 uppercase">
                Quantity
              </span>
              <span className="relative z-0 inline-flex rounded-md shadow-sm">
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((prevCount) =>
                      prevCount > 1 ? prevCount - 1 : 1
                    )
                  }
                  className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 12H6"
                    />
                  </svg>
                </button>
                <span className="relative inline-flex items-center w-12 px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                  <span className="flex-1 text-center">{quantity}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((prevCount) => prevCount + 1)}
                  className="relative inline-flex items-center px-2 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </button>
              </span>
            </div>
            {product.options.map((option) => (
              <label
                key={option.id}
                htmlFor={option.name}
                className="block w-full max-w-xs"
              >
                <span className="block font-semibold tracking-wider text-indigo-600 uppercase">
                  {option.name}
                </span>
                <select
                  name={option.name}
                  id={option.name}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {option.values.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </label>
            ))}
            <button
              onClick={handleCreateCheckout}
              className="inline-flex items-center justify-center w-full max-w-xs px-4 py-2 text-base font-medium text-center text-indigo-700 duration-150 ease-in-out transform bg-indigo-100 border border-transparent rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:-translate-y-px hover:shadow"
            >
              Add to Cart
            </button>
            <a
              href={data?.checkoutCreate?.webUrl}
              className="inline-flex items-center justify-center w-full max-w-xs px-4 py-2 text-base font-medium text-center text-indigo-700 duration-150 ease-in-out transform bg-indigo-100 border border-transparent rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:-translate-y-px hover:shadow"
            >
              Checkout
            </a>
          </div>
        </div>
        <div>
          <div
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            className="mx-auto mt-8 prose-xl text-center text-gray-500"
          />
        </div>
      </div>
    </>
  );
}

async function getStaticPaths() {
  const { data } = await apolloClient.query({
    query: gql`
      query GetProducts {
        products(first: 250) {
          pageInfo {
            hasNextPage
          }
          edges {
            cursor
            node {
              handle
            }
          }
        }
      }
    `,
  });

  return {
    paths: data.products.edges.map(({ node }) => `/products/${node.handle}`),
    fallback: false,
  };
}

async function getStaticProps({ params }) {
  const { data } = await apolloClient.query({
    query: gql`
      query ProductQuery($handle: String!) {
        productByHandle(handle: $handle) {
          availableForSale
          descriptionHtml
          id
          images(first: 250) {
            edges {
              node {
                id
                altText
                originalSrc
              }
            }
          }
          options {
            id
            name
            values
          }
          priceRange {
            minVariantPrice {
              amount
            }
          }
          title
          variants(first: 250) {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    `,
    variables: { handle: params.handle },
  });
  return {
    props: {
      product: data.productByHandle,
    },
  };
}

export { getStaticProps, getStaticPaths };
export default ProductPage;
