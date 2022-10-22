import ContentLoader from "react-content-loader";


export const Loading = () => {
  return (
    <ContentLoader 
    className="pizza-block"
    speed={2}
    width={280}
    height={457}
    viewBox="0 0 280 457"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="130" cy="130" r="130" /> 
    <rect x="0" y="285" rx="6" ry="6" width="280" height="24" /> 
    <rect x="0" y="322" rx="6" ry="6" width="280" height="85" /> 
    <rect x="0" y="420" rx="6" ry="6" width="62" height="31" /> 
    <rect x="122" y="414" rx="25" ry="25" width="155" height="40" />
  </ContentLoader>
  )
}
