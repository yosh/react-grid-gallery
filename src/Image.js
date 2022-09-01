import PropTypes from "prop-types";
import React, { useState } from "react";
import CheckButton from "./CheckButton";
import * as styles from "./styles";

const Image = (props) => {
  const { item, thumbnailImageComponent: ThumbnailImageComponent } = props;

  const [hover, setHover] = useState(false);

  const thumbnailProps = {
    key: props.index,
    "data-testid": "grid-gallery-item_thumbnail",
    src: item.thumbnail,
    alt: item.alt ? item.alt : "",
    title: typeof item.caption === "string" ? item.caption : null,
    style: props.thumbnailStyle
      ? props.thumbnailStyle()
      : styles.thumbnail({ item, rowHeight: props.height }),
  };

  const handleCheckButtonClick = (event) => {
    if (!props.isSelectable) {
      return;
    }
    props.onSelectImage(props.index, event);
  };

  return (
    <div
      className="ReactGridGallery_tile"
      data-testid="grid-gallery-item"
      onMouseEnter={(e) => setHover(true)}
      onMouseLeave={(e) => setHover(false)}
      style={styles.galleryItem({ margin: props.margin })}
    >
      <div
        className="ReactGridGallery_tile-icon-bar"
        style={styles.tileIconBar}
      >
        <CheckButton
          isSelected={item.isSelected}
          isVisible={item.isSelected || (props.isSelectable && hover)}
          onClick={handleCheckButtonClick}
        />
      </div>

      {!!item.tags && (
        <div
          className="ReactGridGallery_tile-bottom-bar"
          style={styles.bottomBar}
        >
          {item.tags.map((tag, index) => (
            <div
              key={tag.key || index}
              title={tag.title}
              style={styles.tagItemBlock}
            >
              <span style={props.tagStyle || styles.tagItem}>{tag.value}</span>
            </div>
          ))}
        </div>
      )}

      {!!item.customOverlay && (
        <div
          className="ReactGridGallery_custom-overlay"
          style={styles.customOverlay({ hover })}
        >
          {item.customOverlay}
        </div>
      )}

      <div
        className="ReactGridGallery_tile-overlay"
        style={styles.tileOverlay({
          showOverlay: hover && !item.isSelected && props.isSelectable,
        })}
      />

      <div
        className="ReactGridGallery_tile-viewport"
        data-testid="grid-gallery-item_viewport"
        style={
          props.tileViewportStyle
            ? props.tileViewportStyle()
            : styles.tileViewport({ item, rowHeight: props.height })
        }
        onClick={props.onClick ? (e) => props.onClick(props.index, e) : null}
      >
        {ThumbnailImageComponent ? (
          <ThumbnailImageComponent {...props} imageProps={thumbnailProps} />
        ) : (
          <img {...thumbnailProps} />
        )}
      </div>
      {item.thumbnailCaption && (
        <div
          className="ReactGridGallery_tile-description"
          style={styles.tileDescription}
        >
          {item.thumbnailCaption}
        </div>
      )}
    </div>
  );
};

Image.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  margin: PropTypes.number,
  height: PropTypes.number,
  isSelectable: PropTypes.bool,
  onClick: PropTypes.func,
  onSelectImage: PropTypes.func,
  tileViewportStyle: PropTypes.func,
  thumbnailStyle: PropTypes.func,
  tagStyle: PropTypes.object,
  customOverlay: PropTypes.element,
  thumbnailImageComponent: PropTypes.func,
};

Image.defaultProps = {
  isSelectable: true,
};

export default Image;
