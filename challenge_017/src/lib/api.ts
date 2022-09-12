export interface Quote {
  id: string;
  author: string;
  text: string;
}

export interface CommentRequestData {
  quoteId: string;
  commentData: { text: string };
}

export interface Comment {
  id: string;
  text: string;
}

export async function getAllQuotes() {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/quotes.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error((data.message as string) || "Could not fetch quotes.");
  }

  const transformedQuotes: Quote[] = [];

  for (const key in data) {
    const quoteObj: Quote = {
      id: key,
      ...data[key],
    };

    transformedQuotes.push(quoteObj);
  }

  return transformedQuotes;
}

export async function getSingleQuote(quoteId: string) {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/quotes/${quoteId}.json`
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch quote.");
  }

  const loadedQuote: Quote = {
    id: quoteId,
    ...data,
  };

  return loadedQuote;
}

export async function addQuote(quoteData: Quote) {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/quotes.json`, {
    method: "POST",
    body: JSON.stringify(quoteData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not create quote.");
  }

  return null;
}

export async function addComment(requestData: CommentRequestData) {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/comments/${requestData.quoteId}.json`,
    {
      method: "POST",
      body: JSON.stringify(requestData.commentData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not add comment.");
  }

  return { commentId: data.name as string };
}

export async function getAllComments(quoteId: string) {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/comments/${quoteId}.json`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not get comments.");
  }

  const transformedComments: Comment[] = [];

  for (const key in data) {
    const commentObj: Comment = {
      id: key,
      ...data[key],
    };

    transformedComments.push(commentObj);
  }

  return transformedComments;
}
