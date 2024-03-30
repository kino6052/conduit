import { uniqueId } from "lodash";
import { TArticleProps } from "../../components/Article/types";
import { TIdMap } from "../../utils/types";

const DEFAULT_POST = {
  id: "post-1",
  userInfoProps: {
    date: "01 January 2024",
    username: "jane-lobster",
  },
  description: "A good article, a really really good one",
  hasLiked: false,
  likes: 24,
  tags: [
    {
      id: "1",
    },
    {
      id: "2",
    },
    {
      id: "3",
    },
  ],
  title: "A good thing",
  comments: [],
};

export class ArticleDatabase {
  private static articles: TIdMap<TArticleProps> = {
    [DEFAULT_POST.id]: DEFAULT_POST,
  };

  public static getArticleIds() {
    return Object.keys(this.articles);
  }

  public static getDoesArticleExist(id: string) {
    const ids = this.getArticleIds();

    return ids.includes(id);
  }

  public static getArticleById(id: string) {
    if (!this.getDoesArticleExist(id)) {
      throw new Error("Article does not exist");
    }

    return this.articles[id];
  }

  public static getArticles() {
    return Object.values(this.articles);
  }

  public static updateArticleById(
    id: string,
    partialArticle: Partial<TArticleProps>,
  ) {
    const article = this.getArticleById(id);

    if (!article) return;

    this.articles[id] = {
      ...this.articles[id],
      ...partialArticle,
    };

    return this.articles[id];
  }

  public static publishArticle(article: TArticleProps) {
    if (this.getDoesArticleExist(article.id)) {
      throw new Error("Article already exists");
    }

    this.articles[article.id] = article;
  }

  public static getArticlesByTag(tag: string) {
    return this.getArticles().filter(
      (article) => !!article.tags.find((_tag) => _tag.id === tag),
    );
  }

  public static getArticlesByUsername(username: string) {
    return this.getArticles().filter(
      (article) => article.userInfoProps.username === username,
    );
  }

  public static getAllTags() {
    return this.getArticles()
      .map((article) => article.tags)
      .flat();
  }

  public static likeArticleById(id: string) {
    const article = this.getArticleById(id);

    const increment = [article.hasLiked && -1, 1].find(
      (item) => typeof item === "number",
    ) as number;

    this.updateArticleById(id, {
      hasLiked: !article.hasLiked,
      likes: article.likes + increment,
    });
  }

  public static addCommentById(id: string, comment: string) {
    const article = this.getArticleById(id);

    this.updateArticleById(id, {
      comments: [
        {
          id: uniqueId(),
          inputProps: {
            id: uniqueId(),
            placeholder: "",
            value: comment,
          },
          iconProps: {
            icon: "favorite",
          },
        },
        ...article.comments,
      ],
    });

    return this.getArticleById(id);
  }

  public static removeArticleById(id: string) {
    const doesExist = this.getDoesArticleExist(id);

    if (doesExist) {
      delete this.articles[id];
    }
  }
}
