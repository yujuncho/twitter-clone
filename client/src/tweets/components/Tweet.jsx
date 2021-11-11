import { Fragment, useState } from "react";
import { BsChat } from "react-icons/bs";
import styled from "styled-components";

import useAuth from "../../shared/hooks/useAuth";

import TweetComposer from "./TweetComposer";
import RetweetButton from "./RetweetButton";
import RetweetInfo from "./RetweetInfo";
import ProfileImage from "./ProfileImage";

import FlexContainer from "../../shared/components/layout/FlexContainer";
import ButtonIcon from "../../shared/components/ui/ButtonIcon";
import colors, { colorKeys } from "../../shared/data/colors";

const TweetAuthorContainer = styled.div``;

const TweetAuthorItem = styled.span`
  opacity: ${props => (props.name ? "100%" : "60%")};
  margin-left: ${props => (props.name ? "0" : "5px")};
`;

const TweetBody = styled.div`
  display: flex;
  flex-direction: ${props => {
    return props.replyingToTweet ? "column-reverse" : "column";
  }};

  & > div {
    margin-top: 0.1rem;
  }
`;

const ReplyInfo = styled.div`
  color: rgba(255, 255, 255, 0.6);
  margin-top: ${props => {
    return props.replyingToTweet ? "1rem !important" : "0.1rem !important";
  }};

  & > span {
    color: ${props =>
      props.replyingToSelf ? "rgba(255, 255, 255, 0.6)" : colors.PRIMARY};
  }
`;

const TweetActions = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 0.75rem;
`;

export default function Tweet(props) {
  const { tweet, retweet, isRetweet, replyingToTweet } = props;
  const [showTweetComposer, setShowTweetComposer] = useState(false);
  const { authContext } = useAuth();
  const createdAt = new Date(tweet.createdAt).toLocaleString("en-us", {
    month: "short",
    day: "numeric"
  });

  const handleReply = () => {
    setShowTweetComposer(true);
  };

  const closeTweetReplier = () => {
    setShowTweetComposer(false);
  };

  return (
    <Fragment>
      {showTweetComposer && (
        <TweetComposer
          tweet={tweet}
          onSave={closeTweetReplier}
          onClick={closeTweetReplier}
        />
      )}
      {isRetweet && <RetweetInfo retweet={retweet} />}
      <FlexContainer>
        <ProfileImage />
        <div style={{ flex: "1" }}>
          <TweetAuthorContainer>
            <TweetAuthorItem name="true">{tweet.author.name}</TweetAuthorItem>
            <TweetAuthorItem>@{tweet.author.username}</TweetAuthorItem>
            <TweetAuthorItem>&#183;</TweetAuthorItem>
            <TweetAuthorItem>{createdAt}</TweetAuthorItem>
          </TweetAuthorContainer>
          <TweetBody replyingToTweet={replyingToTweet}>
            {tweet.inReplyToTweet && (
              <ReplyInfo
                replyingToTweet={replyingToTweet}
                replyingToSelf={
                  authContext.user.username ===
                  tweet.inReplyToTweet.author.username
                }
              >
                Replying to
                <span>
                  {authContext.user.username ===
                  tweet.inReplyToTweet.author.username
                    ? " Yourself"
                    : ` @${tweet.inReplyToTweet.author.username}`}
                </span>
              </ReplyInfo>
            )}
            <div>{tweet.text}</div>
          </TweetBody>
          {!replyingToTweet && (
            <TweetActions>
              <ButtonIcon
                onClick={handleReply}
                title="Reply"
                hover={{
                  color: colorKeys.PRIMARY,
                  background: colorKeys.PRIMARY_OPAQUE
                }}
              >
                <BsChat />
              </ButtonIcon>
              <RetweetButton existingRetweet={retweet} tweet={tweet} />
            </TweetActions>
          )}
        </div>
      </FlexContainer>
    </Fragment>
  );
}
