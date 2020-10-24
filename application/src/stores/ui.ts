import { createContext, useContext } from "react";
import { makeObservable, observable, action } from "mobx";
import { ApolloError } from "@apollo/client";
import { GraphQLError } from "graphql";

type Message = "error" | "info" | "success" | "warning";
export type CreateStore = () => UiStore;

export class UiStore {
  /**
   * Показывать ли всплывашку?
   */
  snackbarShow: boolean;
  /**
   * Текст всплывашки
   */
  snackbarText: string;
  /**
   * Тип всплывашки
   */
  snackbarType: Message;

  /**
   * Показывать индикатор занятости/загрузки?
   */
  backdropShow: boolean;

  constructor() {
    makeObservable(this, {
      snackbarShow: observable,
      snackbarText: observable,
      snackbarType: observable,
      backdropShow: observable,
      showSnackbar: action,
      hideSnackbar: action,
      onApolloError: action,
      showBackdrop: action,
    });
    this.snackbarShow = false;
    this.snackbarText = "";
    this.snackbarType = "info";
    this.backdropShow = false;
  }

  /**
   * Показать всплывашку
   */
  showSnackbar = (props: { type: Message; text: string }) => {
    const { type, text } = props;
    this.snackbarShow = true;
    this.snackbarText = text;
    this.snackbarType = type;
  };
  /**
   * Спрятать всплывашку
   */
  hideSnackbar = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    this.snackbarShow = false;
  };

  onApolloError = (error: ApolloError) => {
    this.snackbarShow = true;
    this.snackbarText = error.message;
    this.snackbarType = "error";
  };

  onGraphqlErrors = (errors: readonly GraphQLError[]) => {
    let messages = errors.map((e) => e.message).join(";");
    this.showSnackbar({
      text: messages,
      type: "error",
    });
  };

  showBackdrop = (show: boolean = true) => {
    this.backdropShow = show;
  };
}

export const createStore: CreateStore = () => {
  const rootStore = new UiStore();
  return rootStore;
};
export const StoreContext = createContext<UiStore>({} as UiStore);
export const StoreProvider = StoreContext.Provider;
export const useUiStore = (): UiStore => {
  return useContext(StoreContext);
};
