import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
    query repositories(
        $orderBy: AllRepositoriesOrderBy
        $orderDirection: OrderDirection
        $searchKeyword: String
    ) {
        repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
            edges {
                node {
                    id
                    fullName
                    reviewCount
                    ratingAverage
                    forksCount
                    stargazersCount
                    description
                    language
                    ownerAvatarUrl
                }
            }
        }
    }
`;

export const ME = gql`
    query getCurrentUser($includeReviews: Boolean = false) {
        me {
            id
            username
            reviews @include(if: $includeReviews) {
                edges {
                    node {
                        id
                        createdAt
                        rating
                        text
                        repository {
                            id
                            fullName
                        }
                        user {
                            username
                        }
                    }
                }
            }
        }
    }
`;

export const GET_REPOSITORY = gql`
    query repository($id: ID!) {
        repository(id: $id) {
            id
            fullName
            reviewCount
            ratingAverage
            forksCount
            stargazersCount
            description
            language
            ownerAvatarUrl
            url
        }
    }
`;

export const GET_REPOSITORY_REVIEWS = gql`
    query repository($id: ID!, $first: Int, $after: String) {
        repository(id: $id) {
            id
            fullName
            reviews(first: $first, after: $after) {
                edges {
                    node {
                        id
                        text
                        rating
                        createdAt
                        user {
                            id
                            username
                        }
                    }
                    cursor
                }
                pageInfo {
                    endCursor
                    startCursor
                    hasNextPage
                }
            }
        }
    }
`;

export const FILTER_REPOSITORIES_RATING = gql`
    query repositories($orderBy: String!) {
        repositories(orderBy: $orderBy) {
            edges {
                node {
                    fullName
                    reviewCount
                    ratingAverage
                    forksCount
                    stargazersCount
                    description
                    language
                    ownerAvatarUrl
                    url
                }
            }
        }
    }
`;
