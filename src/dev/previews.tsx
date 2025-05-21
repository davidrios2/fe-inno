import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox-next";
import {PaletteTree} from "./palette";
import HomePage from "@/app/page";
import MyComponent from "@/components/MyComponent";
import Index from "@/app/page";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/HomePage">
                <HomePage/>
            </ComponentPreview>
            <ComponentPreview path="/MyComponent">
                <MyComponent/>
            </ComponentPreview>
            <ComponentPreview path="/Index">
                <Index/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;