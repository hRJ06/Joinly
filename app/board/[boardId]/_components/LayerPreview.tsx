"use client";

import React, { memo } from "react";

import { useStorage } from "@/liveblocks.config";
import { LayerType } from "@/types/Canvas";
import { Path } from "./Path";
import { Note } from "./Note";
import { Text } from "./Text";
import { Ellipse } from "./Ellipse";
import { Rectangle } from "./Rectangle";
import { colorToCss } from "@/lib/utils";

type LayerPreviewProps = {
  id: string;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
};

export const LayerPreview = memo(
  ({ id, onLayerPointerDown, selectionColor }: LayerPreviewProps) => {
    const layer = useStorage((root) => root.layers.get(id));

    if (!layer) return null;

    switch (layer.type) {
      case LayerType.Path:
        return (
          <Path
            key={id}
            points={layer.points}
            onPointerDown={(e) => onLayerPointerDown(e, id)}
            x={layer.x}
            y={layer.y}
            fill={layer.fill ? colorToCss(layer.fill) : "#000"}
            stroke={selectionColor}
          />
        );
      case LayerType.Note:
        return (
          <Note
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
      case LayerType.Text:
        return (
          <Text
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
      case LayerType.Ellipse:
        return (
          <Ellipse
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
      case LayerType.Rectangle:
        return (
          <Rectangle
            id={id}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
            layer={layer}
          />
        );
      default:
        console.warn("Unknown layer type");
        return null;
    }
  }
);

LayerPreview.displayName = "LayerPreview";
