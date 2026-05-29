export function getVisualStyle() {
    const visualStyle = localStorage.getItem('visualStyle') ?? "ROL";
    return visualStyle
}