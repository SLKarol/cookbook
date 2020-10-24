import React from "react";

import { createStore, StoreProvider } from "stores/recipe";
import FormRecipe from "blocks/FormRecipe/FormRecipe";

const AddRecipe: React.FC = () => {
  const rootStore = createStore();
  return (
    <StoreProvider value={rootStore}>
      <FormRecipe />
    </StoreProvider>
  );
};

export default AddRecipe;
