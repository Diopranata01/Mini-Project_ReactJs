import { gql } from "@apollo/client";

export const BLOG_POSTS = gql`
  query GetBlogPosts($title: String) {
    user_post(order_by: {date: desc}, where: {_not: {activities: {type: {_eq: deleted}}}, is_published: {_eq: true}}) {
      id
      date
      title
      content
      is_published
      user_id
      activities(where: {type: {_eq: published}}) {
        date
        user_post_id
        type
      }
    }
  }
`;

export const BLOG_POSTS_UNPUBLISH = gql`
  query GetBlogPosts {
    user_post(order_by: {date: desc}, where: {_not: {activities: {type: {_eq: deleted}}}, is_published: {_eq: false}}) {
      id
      date
      title
      content
      is_published
      user_id
      activities(where: {type: {_eq: created}}) {
        date
        user_post_id
        type
      }
    }
  }
`;

export const GET_BLOG_POSTS_BY = gql`
  query GetBlogPosts($title: String){
    user_post(order_by: {date: desc}, where: {title: {_ilike: $title}, _not: {activities: {type: {_eq: deleted}}}}) {
      id
      date
      title
      content
      is_published
      user_id
      activities(where: {type: {_eq: published}}) {
        type
        date
        user_post_id
      }
    }
  }
`;

export const GET_DELETED_BLOG_POSTS_BY = gql`
  query GetBlogPosts($title: String){
    user_post(order_by: {date: desc}, where: {title: {_ilike: $title}, activities: {type: {_eq: deleted,}}}) {
      id
      date
      title
      content
      is_published
      user_id
      activities(where: {type: {_eq: published}}) {
        type
        date
        user_post_id
      }
    }
  }
`;

export const DISPLAY_SOFTDELETED_POST = gql`
query GetDeletedPost {
  user_post(order_by: {date: desc}, where: {activities: {type: {_eq: deleted}}, is_published: {_eq: true}}) {
    id
    date
    title
    content
    is_published
    user_id
    activities(where: {type: {_eq: published}}) {
      id
      date
      type
    }
  }
}
`;

export const SET_BLOG_POST_PUBLISHED = gql`
  mutation SetBlogPostPublished($id: Int!, $published: Boolean!) {
    update_user_post(where: {id: {_eq: $id}}, _set: {is_published: $published}) {
      affected_rows
    }
    insert_user_post_activity(objects: {user_post_id: $id, type: published}) {
      affected_rows
    }
  }
`;

export const GET_POST_BY_ID = gql`
  query MyQuery($id: Int){
    user_post(where : {id: {_eq: $id}}) {
      id
      title
      content
    }
  }
`;


export const UPDATE_POST_NEW = gql`
  mutation MyMutation(
    $id: Int!
    $title: String!
    $content: String!
  ) {
    update_user_post(
      where: { id: { _eq: $id } }
      _set: { title: $title, content: $content }
    ) {
      returning {
        id
      }
    }
  }
`;

export const UPDATE_BLOG_POST = gql`
mutation UpdateBlogPost($id: Int!) {
  update_user_post(where: {
    id: {_eq: $id} is_published:{_eq:false}}, _set: {
      title: "Ganti 7", content: "Ini saya coba untuk ubah"
    }){
    affected_rows
  }
}
`;

export const INSERT_BLOG_POST = gql`
mutation InsertBlogPost($title: String!, $content: String!) {
  insert_user_post_one(object: {
    title: $title, content: $content, activities: {data: {type: created}}
  }) {
    id
  }
}
`;

export const SOFT_DELETE_BLOG_POST = gql`
mutation DeleteBlogPost($id: Int!) {
  update_user_post_activity(where: {
    user_post_id: {_eq: $id}
    }, 
      _set: {type: deleted}){
    affected_rows
}
  }
`;

export const DELETE_BLOG_POST = gql`
mutation Deleted_Blog($id: Int!) {
  delete_user_post_activity (
    where: {user_post_id: {_eq: $id}}
  ) {
    affected_rows
  }
  delete_user_post (
    where: {id: {_eq: $id}}
  ) {
    affected_rows
  }
}
`;

