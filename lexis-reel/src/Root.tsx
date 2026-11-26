import { Composition } from "remotion";
import { LexisReel } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="LexisReel" component={LexisReel} durationInFrames={720} fps={30} width={1080} height={1920} />
    </>
  );
};
