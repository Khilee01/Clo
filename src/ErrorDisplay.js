import './ErrorDisplay.css'
export default function ErrorDisplay() {
    return (
        <div id="ErrorOccured">
            <span id="ErrorNumber">
                Error 404!
            </span>
            <span id="ErrorMessage">
                The page that you're trying to access does not exist or is private!
            </span>
        </div>
    )
}