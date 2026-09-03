The sequence of events happens exactly in this order:

The Click (Home.tsx): When a user taps the product card, the <Link> immediately updates the browser's address bar to match the to prop, such as /product/12.

The Match (App.tsx): The router constantly watches the address bar. It sees /product/12 and scans your defined routes. It finds <Route path="/product/:id"/> and identifies a perfect structural match.

The Component Swap: Because of that match, the router executes the element={<ProductDetail/>} instruction. It removes the Home component from the screen and mounts ProductDetail in its place.

The Extraction (ProductDetail.tsx): The moment ProductDetail mounts, the useParams hook runs. Because the router explicitly mapped the end of the URL to the :id variable, the hook slices off the 12 and stores it in your id constant.

The Fetch (Next Step): Your component will take that 12 and inject it into the API call to grab only the data for that specific item. 